import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));

test("development lock matches the manifest", () => {
  assert.deepEqual(lock.packages[""].devDependencies, manifest.devDependencies);
  assert.deepEqual(lock.packages[""].peerDependencies, manifest.peerDependencies);
  assert.equal(lock.packages["node_modules/@earendil-works/pi-coding-agent"].version,
    manifest.devDependencies["@earendil-works/pi-coding-agent"]);
});

test("registry lock entries carry integrity metadata for paranoid Aube installs", () => {
  const packages = lock.packages as Record<string, { resolved?: string; integrity?: string }>;
  for (const [path, entry] of Object.entries(packages)) {
    if (entry.resolved?.startsWith("https://registry.npmjs.org/"))
      assert.match(entry.integrity ?? "", /^sha(?:256|384|512)-\S+$/, `${path} lacks registry integrity`);
  }
});
