# Coverage and deviations

Version 0.1.0 implements prompt selection only. It does not claim full OpenAI harness compliance. All 70 shipped rules default on subject to exact model/tool matching; each can be disabled separately. [Rule reference](rules.md) links every injected text and records its source section and individual adaptation.

## Sources and provenance

Retrieved 2026-09-11 from official OpenAI Markdown endpoints. These are bundled snapshots, not live imports:

| Snapshot | Original URL | Retrieval URL |
|---|---|---|
| [Astra](sources/astra.md) | https://developers.openai.com/api/docs/guides/latest-model#prompting-best-practices | https://developers.openai.com/api/docs/guides/latest-model.md |
| [Codex](sources/codex.md) | https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide | https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide.md |
| [GPT-5.6 family](sources/gpt-5.6.md) | https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6 | https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6.md |

The GPT-5.6 guide explicitly says it applies to “GPT-5.6 Sol or the GPT-5.6 family.” That is the basis for sharing its instructions with Luna and Terra; no model-specific prompt is invented for either. The Codex guide targets GPT-5.3-Codex and starts from GPT-5.1-Codex-Max instructions. Applying its general coding guidance to the four target models is an explicit adaptation, not a claim that they are Codex-tuned models.

Original guide text is attributed to OpenAI (Codex guide authors Noah MacCallum and Brian Fioca). Snapshots include example code as documentary evidence only: it is never executed or imported. Runtime prompt files contain only text. Whitespace, indentation, code fences, and leading bullet markers are normalized during extraction; prose marked verbatim is otherwise unchanged.

Pi integration was checked against installed `@earendil-works/pi-coding-agent@0.84.4`, its complete `docs/extensions.md`, `docs/packages.md`, and `pirate.ts` / `prompt-customizer.ts` examples. Implementation uses the documented `before_agent_start` prompt chain, `ctx.model`, and `getActiveTools()` contract. It does not use provider/session internals.

## Prompt coverage

| Guide recommendation | Status | Implementation / reason |
|---|---|---|
| Astra initiative and follow-through (three snippets) | Implemented | `astra.initiative`, `astra.follow-through`, `astra.reviewable-approval`; hypothetical-warning paragraph is a separate switch |
| Astra skill priority and blocker transparency | Implemented | Two independent rules; no skill discovery, auditing, or editing code |
| Astra paragraphs, plain language, stock phrases, framing | Implemented | Four independent style rules, Astra only |
| Astra delegation | Adapted | Active `subagent` required; replaced blanket permission to spawn from any role with harness-role permission; no tool schema assumptions |
| Astra readable inter-agent messages | Implemented | `astra.legible-messages` |
| Astra meaningful tests and stop verification | Implemented | Two separate switches; compatible with Codex behavior-regression tests |
| Astra recommendation to audit accessible skills | Omitted | User explicitly excluded reviewing existing skills; extension does not inspect them |
| Codex identity as Codex CLI/GPT-5 | Omitted | False identity in Pi/Astra/Sol/Luna/Terra |
| Codex general search/tool preferences | Adapted | Prefer available dedicated tools, fall back to shell; omitted unconditional `rg` preference in favor of Pi's dedicated search tools |
| Codex general parallel calls and exploration/reading section | Adapted | `codex.parallel-reads` uses newer family dependency-aware wording, not fictional `multi_tool_use.parallel` or exclusive scripting bans; Pi schedules sibling calls |
| Codex line-number metadata | Implemented | `codex.line-metadata` |
| Codex working-code default, initiative/persistence/assumptions | Adapted | Omitted duplicate generic directives in favor of model-specific action/scope rules; `codex.finish` retains implementation-only completion requirement |
| Codex avoid looping | Implemented | `codex.avoid-loops` |
| Codex code implementation | Adapted | All nine bullets included; explicit implementation/editing scope prefixes; nested silent-failure bullet retained with error-handling rule |
| Codex editing constraints | Adapted | All seven bullets included; editing-tool preference uses available tools rather than absent `apply_patch`; added task scope |
| Codex plan discipline | Adapted | Six rules, only with active `update_plan`; silent-plan rule omitted in favor of newer preamble guidance; no planning tool created |
| Codex special user requests | Implemented | Simple requests and findings-first reviews |
| Codex frontend tasks | Adapted | Seven independently switchable bullets, each carries original design-system exception; introductory “AI slop”/“bold” prose omitted as redundant with originality bullet |
| Codex presenting work | Adapted | Questions, file dumps, same-machine context, next steps, change explanations, command-output reporting retained; generic brevity/heading/substantial/simple-format bullets replaced by model-specific writing guidance |
| Codex final-answer formatting subsection | Omitted | Detailed heading/bullet/CLI-format prescriptions superseded by model-specific writing defaults; file-reference formatting also left to Pi rather than duplicated |
| Codex old preamble prohibition / frequent update cadence | Adapted | GPT-5.6 sparse multi-step preamble snippet for Sol/Luna/Terra and shared onto Astra (`astra.updates`); neither old prohibition nor 1–3-step cadence injected |
| Codex friendly/pragmatic personalities | Omitted | Alternative examples, not simultaneous defaults; no invented personality selected |
| Codex troubleshooting/metaprompting | Documentation | Source snapshot retains advice; no automatic self-rewriting prompts or background evals |
| GPT-5.6 outcome-first / stopping | Implemented | `gpt-5.6.stop`; customer eligibility example omitted because this is not a support bot |
| GPT-5.6 response length, tone, artifact preservation | Implemented | Three rules; short-answer rule combines two complementary paragraphs |
| GPT-5.6 autonomy boundaries | Implemented | Single coherent policy for research versus changes versus external actions |
| GPT-5.6 prerequisites and parallel retrieval | Implemented | `gpt-5.6.prerequisites` plus shared `codex.parallel-reads` |
| GPT-5.6 empty/partial retrieval fallback | Implemented | Separate `gpt-5.6.retrieval-fallback` rule |
| GPT-5.6 grounding and citation behavior | Implemented | Retrieval-budget and citation rules, including preserving source-backed versus creative claims |
| GPT-5.6 sparse updates | Implemented | Family rule; same snippet separately addressable on Astra |
| GPT-5.6 frontend preservation and coding validation | Implemented | Family-specific rules; no new image/browser tools |
| GPT-5.6 visual artifact rendering / plan checklist | Implemented | Task-scoped `gpt-5.6.visual-validation` and `gpt-5.6.plan-content`; no visual runtime or planning tool is added |
| GPT-5.6 prompt structure, simplification, migration/evals | Documentation | Guidance for maintaining the extension; no empty template scaffolding or automatic prompt deletion injected |

## Harness and API coverage

“Pi-owned” means this extension deliberately leaves the capability to Pi, not that every upstream requirement has been proven end-to-end.

| Recommendation | Status | Boundary |
|---|---|---|
| Tool schema/name discipline | Adapted | Existing tool descriptions govern invocation; no renamed shell/read/edit tools |
| `apply_patch`, Codex shell, `exec_command`, `write_stdin`, `view_image`, `update_plan` | Omitted | No custom tools or native helpers. Pi's read/edit/write/bash remain unchanged; optional existing update_plan gets prompt guidance only |
| Parallel execution | Pi-owned | Pi 0.84.4 documents parallel execution and active tools; no tool scheduler or API field override |
| Tool result ordering/truncation | Pi-owned / deviation | Existing Pi limits and head/tail behavior, not OpenAI's exact 10K-token middle-truncation recipe |
| AGENTS discovery and instruction injection | Pi-owned | No Codex directory search/role emulation; preserve complete input prompt byte-for-byte |
| Assistant phases and reasoning replay | Pi-owned / unverified | No history rewrites, synthetic phase values, or task-stage substitute. Live provider replay correctness not tested here |
| Native OpenAI encrypted compaction | Omitted | Ordinary Pi compaction remains; not represented as native Responses compaction |
| Stable prompt caching | Adapted / Pi-owned | Deterministic rule ordering and no timestamps/random IDs; model/tool/config changes intentionally change prompt. Cache fields and transport remain Pi-owned |
| Reasoning effort and verbosity | Pi-owned | Preserve user choices; no medium-everywhere reset or verbosity override |
| Astra unsupported sampling/logprob removal | Omitted | Public API advice is not assumed to apply identically to every Codex-authenticated route; no speculative payload mutation |
| Astra cache TTL / native reasoning configuration updates | Omitted | Requires verified transport applicability; no provider override or undocumented fields |
| Responses API / migration / model selection | Pi-owned | No switching providers, credentials, model catalogs, API, or context windows |
| Fast mode / EU residency restrictions | Pi-owned | Existing provider configuration remains authoritative; no service-tier changes or residency guessing |
| Hosted multi-agent, PTC, async tools, WebSocket steering | Omitted | Optional protocol implementations outside complexity budget; Pi collaboration tools may still be used when provided |
| Hosted shell/tool search/visual detail | Omitted | No hosted resources, new tool loader, or image transformations |

## Configuration and composition limitations

JSON was chosen instead of TOML to avoid a parser dependency. One fixed global path, no project configuration. Only rule opt-outs are configured: omitted features have no fake switches. Disabling one rule does not disable adjacent rules or existing Pi capabilities.

Instructions are appended, never used to strip or replace Pi/AGENTS/other-extension instructions. This preserves source context but cannot eliminate contradictions already present elsewhere. Known overlap detection and arbitrary third-party compatibility are intentionally outside scope. The initial supported baseline is Pi 0.84.4, with optional active tools literally named `subagent` and `update_plan`. No assumptions about their argument schemas are embedded. Independently launched subagents receive this extension only if their Pi process actually loads it.

Selection is reevaluated at each user turn, including after model changes/resume. There is no persisted extension state and no conversation mutation. Pi normally supplies a fresh base prompt; an exact last-appended suffix is removed if a caller passes the previous output back. Arbitrary accumulated blocks elsewhere in a prompt are not searched/deleted because that could damage user text.

The source pages can change after this snapshot. Update snapshots and rule text together in a versioned release and document new deviations. Opt-outs are stable IDs, not positional indices.
