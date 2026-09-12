import { readFileSync } from "node:fs";
import { rules } from "./catalog.ts";

export type Model = { id: string; provider: string };
export type Rule = { id: string; models: string; tool?: string };
export type Config = { disabled: string[] };
const providers = new Set(["openai", "openai-codex"]);
const models: Record<string, string> = {
  "gpt-6-astra": "astra",
  "gpt-5.6-sol": "family",
  "gpt-5.6-luna": "family",
  "gpt-5.6-terra": "family",
};

export function modelFamily(model?: Model): string | undefined {
  return model && providers.has(model.provider) && Object.hasOwn(models, model.id)
    ? models[model.id] : undefined;
}

export function parseConfig(value: unknown): Config {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Expected a JSON object with an optional disabled array");
  }
  const object = value as Record<string, unknown>;
  if (Object.keys(object).some(key => key !== "disabled")) {
    throw new Error("Unknown configuration key; only disabled is supported");
  }
  const disabled = Object.hasOwn(object, "disabled") ? object.disabled : [];
  const known = new Set<string>(rules.map(rule => rule.id));
  if (!Array.isArray(disabled) || disabled.some(id => typeof id !== "string" || !known.has(id))) {
    throw new Error("disabled must be an array of known rule IDs (see docs/rules.md)");
  }
  return { disabled: [...new Set(disabled)] };
}

export function readConfig(path: string): Config {
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { disabled: [] };
    throw new Error(`Cannot read OpenAI guidance config: ${path}`, { cause: error });
  }
  try {
    return parseConfig(JSON.parse(text));
  } catch (error) {
    throw new Error(`Invalid OpenAI guidance config: ${path}`, { cause: error });
  }
}

export function selectRules(model: Model | undefined, tools: readonly string[], config: Config): Rule[] {
  const family = modelFamily(model);
  if (!family) return [];
  return (rules as readonly Rule[]).filter(rule =>
    (rule.models === "all" || rule.models === family) &&
    !config.disabled.includes(rule.id) && (!rule.tool || tools.includes(rule.tool)));
}

export function loadTexts(): Map<string, string> {
  return new Map(rules.map(rule => [rule.id,
    readFileSync(new URL(`../rules/${rule.id}.md`, import.meta.url), "utf8").trim()]));
}

export function guidanceBlock(selected: Rule[], texts: Map<string, string>): string {
  if (!selected.length) return "";
  return "\n\n<pi-openai-guidance>\n" + selected.map(rule => {
    const text = texts.get(rule.id);
    if (!text) throw new Error(`Missing bundled rule: ${rule.id}`);
    return `### ${rule.id}\n${text}`;
  }).join("\n\n") + "\n</pi-openai-guidance>";
}

// Pi supplies the base prompt each turn. Only remove the exact suffix we last added
// if a caller reuses our previous output; never parse or rewrite user prompt text.
export function baseWithoutPrevious(prompt: string, previous: string): string {
  return previous && prompt.endsWith(previous) ? prompt.slice(0, -previous.length) : prompt;
}
