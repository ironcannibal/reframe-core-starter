---
name: {{SLUG}}
description: {{WHAT_IT_DOES_ONE_CLAUSE}} Use when the operator says {{QUOTED_TRIGGER_PHRASES_INCL_SLASH}}. NOT for {{WRONG_USE}} — that's {{SIBLING_SKILL}}.
{{ARGUMENT_HINT_LINE}}
bike-method-phase: 1
{{ATTRIBUTION_KEY_BLOCK}}
---

> *{{OPENING_TAGLINE}}*

## What this does

{{PLAIN_LANGUAGE_PURPOSE}}

{{OUTPUT_PATHS_IF_DOCUMENT_SKILL}}

{{AUTONOMY_LINE_IF_RELEVANT}}

## When to invoke — and when NOT to

**Invoke** when:
{{INVOKE_BULLETS}}

**Do NOT invoke** for {{NON_USE_CASE}} — that's {{SIBLING_SKILL}}. {{WHY_WRONG_TOOL}}

## Inputs to read

- {{INVOCATION_INPUT}}
- `CLAUDE.md` — the operator's identity and voice. {{VOICE_REASON}}
{{CORNERSTONE_SOP_LINES_IF_RELEVANT}}
{{BUNDLED_TEMPLATE_LINES_IF_ANY}}
{{VAULT_SOURCE_LINES_IF_RELEVANT}}

## Process

{{STEP_0_GATE_IF_SPAWNS_AGENTS_OR_COSTS}}

### Step 1 — {{STEP_1_TITLE}}
{{STEP_1_BODY}}

### Step 2 — {{STEP_2_TITLE}}
{{STEP_2_BODY}}

{{ADDITIONAL_STEPS}}

### Step N — Output + report one screen
{{FINAL_STEP_BODY}}

## Output

{{OUTPUT_CONTRACT}}

## {{RULES_HEADING}}

{{NUMBERED_RULES}}

## Bike Method posture

- **Phase 1 — Training wheels (current).** {{PHASE_1_DESCRIPTION}}
- **Phase 2 — Guided.** {{PHASE_2_DESCRIPTION}}

Phase advances only by explicit edit to `bike-method-phase:` in this frontmatter.

{{CLOSING_STAMP_IF_DELIVERABLE_SKILL}}
