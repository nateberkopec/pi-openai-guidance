# Rule reference

All listed rules default on when their model and tool conditions match. `all` means all four supported models; `family` means Sol, Luna, and Terra. Rule text is linked individually.

| ID | Models | Source section | Adaptation | Required tool |
|---|---|---|---|---|
| [astra.initiative](../rules/astra.initiative.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.follow-through](../rules/astra.follow-through.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.reviewable-approval](../rules/astra.reviewable-approval.md) | astra | [astra](sources/astra.md): Prompting best practices | None; split independent paragraphs. | — |
| [astra.reviewable-approval-warnings](../rules/astra.reviewable-approval-warnings.md) | astra | [astra](sources/astra.md): Prompting best practices | None; split independent paragraphs. | — |
| [astra.skill-priority](../rules/astra.skill-priority.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.skill-transparency](../rules/astra.skill-transparency.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.paragraphs](../rules/astra.paragraphs.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.plain-language](../rules/astra.plain-language.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.avoid-stock-phrases](../rules/astra.avoid-stock-phrases.md) | astra | [astra](sources/astra.md): Prompting best practices | None; split independent paragraphs. | — |
| [astra.avoid-stock-phrases-framing](../rules/astra.avoid-stock-phrases-framing.md) | astra | [astra](sources/astra.md): Prompting best practices | None; split independent paragraphs. | — |
| [astra.delegation](../rules/astra.delegation.md) | astra | [astra](sources/astra.md): Prompting best practices | Replaced root/subagent blanket permission with harness-role permission; added tool-description authority. Only loaded with active subagent tool. | subagent |
| [astra.legible-messages](../rules/astra.legible-messages.md) | astra | [astra](sources/astra.md): Prompting best practices | None; extracted verbatim. | — |
| [astra.testing-meaningful](../rules/astra.testing-meaningful.md) | astra | [astra](sources/astra.md): Prompting best practices | None; split independent paragraphs. | — |
| [astra.testing-stop](../rules/astra.testing-stop.md) | astra | [astra](sources/astra.md): Prompting best practices | None; split independent paragraphs. | — |
| [codex.dedicated-tools](../rules/codex.dedicated-tools.md) | all | [codex](sources/codex.md): General | Removed Codex-only tool inventory and replaced names with active-tool descriptions; no tools are registered or enabled. | — |
| [codex.line-metadata](../rules/codex.line-metadata.md) | all | [codex](sources/codex.md): General | None; extracted verbatim. | — |
| [codex.avoid-loops](../rules/codex.avoid-loops.md) | all | [codex](sources/codex.md): Autonomy and Persistence | None; extracted verbatim. | — |
| [codex.correctness](../rules/codex.correctness.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.conventions](../rules/codex.conventions.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.completeness](../rules/codex.completeness.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.behavior-tests](../rules/codex.behavior-tests.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.errors](../rules/codex.errors.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.coherent-edits](../rules/codex.coherent-edits.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.types](../rules/codex.types.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.reuse](../rules/codex.reuse.md) | all | [codex](sources/codex.md): Code Implementation | Added explicit implementation/editing task scope. | — |
| [codex.finish](../rules/codex.finish.md) | all | [codex](sources/codex.md): Code Implementation | Restricted mandatory edits to implementation requests. | — |
| [codex.ascii](../rules/codex.ascii.md) | all | [codex](sources/codex.md): Editing constraints | Added explicit implementation/editing task scope. | — |
| [codex.comments](../rules/codex.comments.md) | all | [codex](sources/codex.md): Editing constraints | Added explicit implementation/editing task scope. | — |
| [codex.editing-tools](../rules/codex.editing-tools.md) | all | [codex](sources/codex.md): Editing constraints | Replaced unavailable apply_patch preference with available editing tools; retained generated/bulk-edit exception. Added explicit implementation/editing task scope. | — |
| [codex.preserve-work](../rules/codex.preserve-work.md) | all | [codex](sources/codex.md): Editing constraints | Added explicit implementation/editing task scope. | — |
| [codex.amend](../rules/codex.amend.md) | all | [codex](sources/codex.md): Editing constraints | Added explicit implementation/editing task scope. | — |
| [codex.unexpected-changes](../rules/codex.unexpected-changes.md) | all | [codex](sources/codex.md): Editing constraints | Added explicit implementation/editing task scope. | — |
| [codex.destructive-git](../rules/codex.destructive-git.md) | all | [codex](sources/codex.md): Editing constraints | Added explicit implementation/editing task scope. | — |
| [codex.plan-skip-simple](../rules/codex.plan-skip-simple.md) | all | [codex](sources/codex.md): Plan tool | Conditional on active update_plan; added planning scope. No tool is implemented. | update_plan |
| [codex.plan-multiple-steps](../rules/codex.plan-multiple-steps.md) | all | [codex](sources/codex.md): Plan tool | Conditional on active update_plan; added planning scope. No tool is implemented. | update_plan |
| [codex.plan-update](../rules/codex.plan-update.md) | all | [codex](sources/codex.md): Plan tool | Conditional on active update_plan; added planning scope. No tool is implemented. | update_plan |
| [codex.plan-deliver](../rules/codex.plan-deliver.md) | all | [codex](sources/codex.md): Plan tool | Conditional on active update_plan and implementation requests; no code-delivery requirement for research/review. No tool is implemented. | update_plan |
| [codex.plan-closure](../rules/codex.plan-closure.md) | all | [codex](sources/codex.md): Plan tool | Conditional on active update_plan; added planning scope. No tool is implemented. | update_plan |
| [codex.plan-promises](../rules/codex.plan-promises.md) | all | [codex](sources/codex.md): Plan tool | Conditional on active update_plan; added planning scope. No tool is implemented. | update_plan |
| [codex.simple-requests](../rules/codex.simple-requests.md) | all | [codex](sources/codex.md): Special user requests | None; extracted verbatim. | — |
| [codex.reviews](../rules/codex.reviews.md) | all | [codex](sources/codex.md): Special user requests | None; extracted verbatim. | — |
| [codex.frontend-typography](../rules/codex.frontend-typography.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.frontend-color](../rules/codex.frontend-color.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.frontend-motion](../rules/codex.frontend-motion.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.frontend-background](../rules/codex.frontend-background.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.frontend-originality](../rules/codex.frontend-originality.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.frontend-responsive](../rules/codex.frontend-responsive.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.frontend-complete](../rules/codex.frontend-complete.md) | all | [codex](sources/codex.md): Frontend tasks | Repeated shared frontend scope/design-system exception so each rule can be disabled independently. | — |
| [codex.questions](../rules/codex.questions.md) | all | [codex](sources/codex.md): Presenting your work and final message | None; extracted verbatim. | — |
| [codex.file-dumps](../rules/codex.file-dumps.md) | all | [codex](sources/codex.md): Presenting your work and final message | None; extracted verbatim. | — |
| [codex.same-machine](../rules/codex.same-machine.md) | all | [codex](sources/codex.md): Presenting your work and final message | None; extracted verbatim. | — |
| [codex.next-steps](../rules/codex.next-steps.md) | all | [codex](sources/codex.md): Presenting your work and final message | None; extracted verbatim. | — |
| [codex.changes](../rules/codex.changes.md) | all | [codex](sources/codex.md): Presenting your work and final message | None; extracted verbatim. | — |
| [codex.command-output](../rules/codex.command-output.md) | all | [codex](sources/codex.md): Presenting your work and final message | None; extracted verbatim. | — |
| [codex.parallel-reads](../rules/codex.parallel-reads.md) | all | [gpt-5.6](sources/gpt-5.6.md): Tool routing | Uses newer family wording instead of Codex-exclusive multi_tool_use.parallel instructions; Pi owns scheduling. | — |
| [gpt-5.6.stop](../rules/gpt-5.6.stop.md) | family | [gpt-5.6](sources/gpt-5.6.md): Outcome-first prompts and stopping conditions | None; extracted verbatim. | — |
| [gpt-5.6.short-answer](../rules/gpt-5.6.short-answer.md) | family | [gpt-5.6](sources/gpt-5.6.md): Personality, collaboration, and response length | Combines two excerpts with the upstream shorter-answer applicability condition restored as an introductory qualifier. | — |
| [gpt-5.6.tone](../rules/gpt-5.6.tone.md) | family | [gpt-5.6](sources/gpt-5.6.md): Personality, collaboration, and response length | None; extracted verbatim. | — |
| [gpt-5.6.preserve-artifact](../rules/gpt-5.6.preserve-artifact.md) | family | [gpt-5.6](sources/gpt-5.6.md): Personality, collaboration, and response length | None; extracted verbatim. | — |
| [gpt-5.6.scope](../rules/gpt-5.6.scope.md) | family | [gpt-5.6](sources/gpt-5.6.md): Define autonomy and approval boundaries | None; extracted verbatim. | — |
| [gpt-5.6.prerequisites](../rules/gpt-5.6.prerequisites.md) | family | [gpt-5.6](sources/gpt-5.6.md): Tool routing | None; extracted verbatim. | — |
| [gpt-5.6.retrieval-budget](../rules/gpt-5.6.retrieval-budget.md) | family | [gpt-5.6](sources/gpt-5.6.md): Grounding, citations, and retrieval budgets | None; extracted verbatim. | — |
| [gpt-5.6.updates](../rules/gpt-5.6.updates.md) | family | [gpt-5.6](sources/gpt-5.6.md): Long-running workflows and state | None; extracted verbatim. | — |
| [gpt-5.6.validation](../rules/gpt-5.6.validation.md) | family | [gpt-5.6](sources/gpt-5.6.md): Check work before finishing | None; extracted verbatim. | — |
| [gpt-5.6.citations](../rules/gpt-5.6.citations.md) | family | [gpt-5.6](sources/gpt-5.6.md): Grounding, citations, and retrieval budgets | None; extracted verbatim. | — |
| [gpt-5.6.frontend](../rules/gpt-5.6.frontend.md) | family | [gpt-5.6](sources/gpt-5.6.md): Frontend and visual tasks | None; extracted verbatim. | — |
| [astra.updates](../rules/astra.updates.md) | astra | [gpt-5.6](sources/gpt-5.6.md): Long-running workflows and state | Shared-family preamble guidance used on Astra instead of older Codex prohibition/cadence. | — |
| [gpt-5.6.retrieval-fallback](../rules/gpt-5.6.retrieval-fallback.md) | family | [gpt-5.6](sources/gpt-5.6.md): Tool routing | None; extracted verbatim, preserving task scope. | — |
| [gpt-5.6.visual-validation](../rules/gpt-5.6.visual-validation.md) | family | [gpt-5.6](sources/gpt-5.6.md): Check work before finishing | None; extracted verbatim, preserving task scope. | — |
| [gpt-5.6.plan-content](../rules/gpt-5.6.plan-content.md) | family | [gpt-5.6](sources/gpt-5.6.md): Check work before finishing | None; extracted verbatim, preserving task scope. | — |
