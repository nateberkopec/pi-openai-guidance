# pi-openai-guidance

## Based on OpenAI's official prompting guides

- **[GPT-6 Astra: Prompting best practices](https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices)**
- **[Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide)**

Model-specific OpenAI prompting recommendations for a personal Pi setup. Astra gets Astra instructions; Sol, Luna, and Terra get GPT-5.6-family instructions. Applicable Codex coding guidance is shared. Each rule has an independent opt-out.

This is a prompt extension, not a replacement harness. It preserves Pi's prompt and tools, uses no runtime network requests, and changes no API parameters or reasoning settings. See the [coverage and deviations](docs/coverage.md) before enabling it.

## Requirements

- Pi 0.84.4 (the audited version; newer versions are not yet verified).
- Node.js 22.19 or newer.
- Exact model IDs `gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-luna`, or `gpt-5.6-terra` on `openai-codex` or `openai`. Other providers, aliases, and models are unchanged.

## Quickstart

From this checkout, try it for one session without installing it:

```fish
pi -e ./src/index.ts
```

There are no runtime dependencies beyond Pi and Node built-ins. Select a supported model in Pi using your existing authentication. This repository does not supply models or credentials.

## Installation

If the trial works for you, add the local package to Pi:

```fish
pi install ~/Documents/Code.nosync/personal/pi-openai-guidance
```

This explicitly changes your Pi settings; merely cloning the repository does not. To remove it:

```fish
pi remove ~/Documents/Code.nosync/personal/pi-openai-guidance
```

## Configuration

No config file means all applicable bundled rules are enabled. Create the single global file `~/.pi/agent/openai-guidance.json` to disable rules:

```json
{
  "disabled": [
    "astra.avoid-stock-phrases",
    "codex.frontend-typography",
    "gpt-5.6.updates"
  ]
}
```

Only `disabled` is accepted. It is an array of exact IDs from the [rule reference](docs/rules.md). Omitted rules remain on; duplicate IDs are harmless. Unknown IDs, unknown keys, invalid JSON, and invalid value types produce an extension error rather than falling back to all-on. Pi logs extension errors and can continue the turn without this extension's guidance; this is not a security gate.

The file is reread at every supported-model user turn. There are no project overrides, commands, UI, or per-project config discovery. The path is fixed even when `PI_CODING_AGENT_DIR` is set. Prompt files are loaded when the extension loads; restart/reload after updating the package.

Delegation guidance requires an active `subagent` tool; plan-tool rules require active `update_plan`. This extension never enables either tool. Tool availability is sampled before each user turn, not continuously inside a turn. Existing tool descriptions and harness role restrictions govern their use.

Disabling a rule removes only this extension's copy. It cannot remove similar instructions supplied by Pi, AGENTS files, another extension, or previous conversation turns. Model switches select fresh guidance on the next user turn; past conversation messages are untouched.

## Development and testing

```fish
npm install --ignore-scripts
npm run check
```

Tests use Node's built-in runner and temporary homes/configs; they make no model requests. Typechecking uses the real Pi 0.84.4 declarations. See [validation](docs/validation.md) for checks and limitations.

The budget is at most 1,000 handwritten executable lines, including tests and scripts. Prompt text, Markdown, source snapshots, and documentation fixtures are excluded. Current TypeScript is approximately 300 lines. The test suite enforces the source/test line limit; count additional executable files too if adding them.

## Contributing

This is a local personal package, not published to npm. Keep changes narrow: update a source snapshot, change the affected rule files, record deviations, and rerun the same tests. Preserve existing IDs when wording changes so opt-outs survive updates. New rules default on only when their documented model/tool conditions match.

The [source snapshots](docs/coverage.md#sources-and-provenance) are versioned with the package; nothing downloads instructions at runtime. No existing skills or dotfiles are inspected or modified by this extension.

## License and attribution

OpenAI-authored guide excerpts and source snapshots retain their upstream attribution; see [provenance](docs/coverage.md#sources-and-provenance). No third-party extension implementation was copied. This personal repository does not currently grant a separate redistribution license for its own implementation.
