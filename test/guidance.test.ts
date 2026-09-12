import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import extension from "../src/index.ts";
import { rules } from "../src/catalog.ts";
import { baseWithoutPrevious, guidanceBlock, loadTexts, modelFamily, parseConfig, readConfig, selectRules } from "../src/guidance.ts";

const model = (id = "gpt-6-astra", provider = "openai-codex") => ({ id, provider });
const defaults = { disabled: [] };
const tools = ["read", "edit", "bash", "subagent", "update_plan"];
const texts = loadTexts();
const ids = (id: string, disabled: string[] = [], active = tools) =>
  selectRules(model(id), active, { disabled }).map(rule => rule.id);

test("exact supported model/provider pairs, no heuristics or inherited object keys", () => {
  for (const provider of ["openai", "openai-codex"]) {
    assert.equal(modelFamily(model("gpt-6-astra", provider)), "astra");
    for (const id of ["gpt-5.6-sol", "gpt-5.6-luna", "gpt-5.6-terra"]) assert.equal(modelFamily(model(id, provider)), "family");
  }
  for (const id of ["gpt-6-astra-mini", "gpt-5.6", "gpt-5.3-codex", "toString"])
    assert.equal(modelFamily(model(id)), undefined);
  assert.equal(modelFamily(model("gpt-6-astra", "other")), undefined);
  assert.equal(modelFamily(), undefined);
});

test("Astra-only guidance never leaks to Sol/Luna/Terra; family guidance is included", () => {
  assert(ids("gpt-6-astra").includes("astra.follow-through"));
  assert(!ids("gpt-6-astra").includes("gpt-5.6.scope"));
  for (const id of ["gpt-5.6-sol", "gpt-5.6-luna", "gpt-5.6-terra"]) {
    assert(ids(id).includes("gpt-5.6.scope"));
    assert(ids(id).includes("gpt-5.6.validation"));
    assert(ids(id).every(rule => !rule.startsWith("astra.")));
  }
});

test("every rule is independently removable and all other rules remain unchanged", () => {
  for (const id of ["gpt-6-astra", "gpt-5.6-sol", "gpt-5.6-luna", "gpt-5.6-terra"]) {
    const enabled = ids(id);
    for (const rule of enabled) assert.deepEqual(ids(id, [rule]), enabled.filter(value => value !== rule));
    assert.deepEqual(ids(id, enabled), []);
  }
});

test("only active collaboration/planning tools enable their instructions", () => {
  const noTools = ids("gpt-6-astra", [], []);
  assert(!noTools.includes("astra.delegation"));
  assert(!noTools.some(id => id.startsWith("codex.plan-")));
  assert(ids("gpt-6-astra", [], ["subagent"]).includes("astra.delegation"));
  assert(!ids("gpt-6-astra", ["astra.delegation"], ["subagent"]).includes("astra.delegation"));
  const block = guidanceBlock(selectRules(model(), [], defaults), texts);
  for (const absent of ["multi_tool_use.parallel", "read_file", "exec_command", "apply_patch"])
    assert(!block.includes(absent), absent);
});

test("strict config validation and duplicate opt-out normalization", () => {
  assert.deepEqual(parseConfig({}), defaults);
  assert.deepEqual(parseConfig({ disabled: ["astra.initiative", "astra.initiative"] }), { disabled: ["astra.initiative"] });
  for (const value of [null, [], true, "", { disabled: null }, { disabled: true },
    { disabled: [1] }, { disabled: ["typo"] }, { disabled: [], unknown: 1 }])
    assert.throws(() => parseConfig(value));
});

test("missing config defaults on; malformed JSON and unreadable paths surface errors", () => {
  const dir = mkdtempSync(join(tmpdir(), "guidance-config-"));
  try {
    const path = join(dir, "config.json");
    assert.deepEqual(readConfig(path), defaults);
    writeFileSync(path, "{");
    assert.throws(() => readConfig(path), /Invalid OpenAI guidance config/);
    assert.throws(() => readConfig(dir), /Cannot read OpenAI guidance config/);
    writeFileSync(path, '{"disabled":["astra.initiative"]}');
    assert.deepEqual(readConfig(path), { disabled: ["astra.initiative"] });
  } finally { rmSync(dir, { recursive: true }); }
});

test("preserves base prompt byte-for-byte, deterministic assembly, no accumulation", () => {
  const base = "User AGENTS and other extension text\n\n";
  const block = guidanceBlock(selectRules(model(), tools, defaults), texts);
  assert.equal(baseWithoutPrevious(base, block), base);
  assert.equal(baseWithoutPrevious(base + block, block) + block, base + block);
  assert.equal(baseWithoutPrevious(base + block + "other extension", block), base + block + "other extension");
  assert.equal(guidanceBlock([], texts), "");
  assert.throws(() => guidanceBlock([{ id: "missing", models: "all" }], texts));
});

test("real extension hook switches models, rereads opt-outs, and leaves other events alone", () => {
  const dir = mkdtempSync(join(tmpdir(), "guidance-hook-"));
  const homeKey = process.platform === "win32" ? "USERPROFILE" : "HOME";
  const home = process.env[homeKey];
  process.env[homeKey] = dir;
  type Handler = (event: { systemPrompt: string }, ctx: { model?: ReturnType<typeof model> }) => { systemPrompt: string } | undefined;
  const handlers = new Map<string, Handler>();
  let active = tools;
  try {
    extension({ on: (name: string, handler: Handler) => handlers.set(name, handler), getActiveTools: () => active } as unknown as ExtensionAPI);
    assert.deepEqual([...handlers.keys()], ["before_agent_start"]);
    const run = handlers.get("before_agent_start")!;
    const base = "untouched system prompt";
    const astra = run({ systemPrompt: base }, { model: model() })!.systemPrompt;
    assert(astra.startsWith(base));
    assert.equal(run({ systemPrompt: astra }, { model: model() })!.systemPrompt, astra);
    const sol = run({ systemPrompt: astra }, { model: model("gpt-5.6-sol") })!.systemPrompt;
    assert(!sol.includes("### astra."));
    const luna = run({ systemPrompt: base }, { model: model("gpt-5.6-luna") })!.systemPrompt;
    assert.equal(sol, luna);
    const terra = run({ systemPrompt: luna }, { model: model("gpt-5.6-terra") })!.systemPrompt;
    assert.equal(terra, luna);
    assert.equal(run({ systemPrompt: terra }, { model: model("other") })!.systemPrompt, base);
    assert.equal(run({ systemPrompt: base }, {}), undefined);
    mkdirSync(join(dir, ".pi/agent"), { recursive: true });
    const path = join(dir, ".pi/agent/openai-guidance.json");
    writeFileSync(path, '{"disabled":["astra.initiative"]}');
    active = [];
    const changed = run({ systemPrompt: base }, { model: model() })!.systemPrompt;
    assert(!changed.includes("### astra.initiative"));
    assert(!changed.includes("### astra.delegation"));
    writeFileSync(path, "invalid");
    assert.throws(() => run({ systemPrompt: base }, { model: model() }), /Invalid/);
    assert.equal(run({ systemPrompt: base }, { model: model("other") }), undefined);
  } finally {
    if (home === undefined) delete process.env[homeKey]; else process.env[homeKey] = home;
    rmSync(dir, { recursive: true });
  }
});

test("bundled files match catalog, have substantive text, and executable budget stays below 1000", () => {
  assert.equal(new Set(rules.map(rule => rule.id)).size, rules.length);
  assert.deepEqual(readdirSync(new URL("../rules/", import.meta.url)).sort(), rules.map(rule => `${rule.id}.md`).sort());
  for (const text of texts.values()) assert(text.length > 40);
  const files = ["src", "test"].flatMap(dir => readdirSync(new URL(`../${dir}/`, import.meta.url)).map(file => `${dir}/${file}`));
  const lines = files.reduce((sum, file) => sum + readFileSync(new URL(`../${file}`, import.meta.url), "utf8").trimEnd().split("\n").length, 0);
  assert(lines <= 1000, `${lines} executable lines exceeds budget`);
});

test("conditional recommendations retain their task applicability in the injected prompt", () => {
  for (const id of ["gpt-6-astra", "gpt-5.6-sol", "gpt-5.6-luna", "gpt-5.6-terra"]) {
    const block = guidanceBlock(selectRules(model(id), tools, defaults), texts);
    assert(block.includes("For implementation requests, when using the available planning tool:"));
    if (id !== "gpt-6-astra") assert(block.includes("When a task calls for a shorter answer:"));
  }
});

test("rules documented as verbatim remain excerpts of their bundled source", () => {
  const reference = readFileSync(new URL("../docs/rules.md", import.meta.url), "utf8");
  const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
  for (const row of reference.split("\n").filter(line => line.includes("| None;"))) {
    const id = row.match(/^\| \[([^\]]+)\]/)![1];
    const source = row.match(/\(sources\/([^)]*)\)/)![1];
    const original = readFileSync(new URL(`../docs/sources/${source}`, import.meta.url), "utf8");
    assert(normalize(original).includes(normalize(texts.get(id)!)), id);
  }
});
