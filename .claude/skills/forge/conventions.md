# Reframe Core skill-authoring conventions

*This is the house style for skills in `.claude/skills/`. `/forge` pastes it into every worker's brief so drafts conform without re-deriving. Do not rebuild these rules from scratch — clone them.*

---

## 1. Frontmatter (YAML) — the formula

```yaml
name: <bare-kebab-slug>            # = the folder name AND the /slash command
description: <ONE clause of what it does> — <"Use when the operator says …" with literal quoted trigger phrases incl. the "/slash" form> — <optional "NOT for X — that's /other" exclusion>.
argument-hint: "[what the user passes]"   # only if the skill takes an input
bike-method-phase: 1              # autonomy gate; present on all doc/build skills
<source>-attribution: |          # free-form credit key when a pattern is borrowed
  One line crediting the source. © 2026 <name> where applicable.
```

- **Never** put `model:`, `tools:`, or `allowed-tools:` in a SKILL.md frontmatter. Model/tool choice is made in prose. (Only *agent* files — `.claude/agents/*.md` — carry `tools:` and `model:`.)
- The `description` is the trigger. Follow the formula exactly: what it does → "Use when the operator says …" with quoted phrases → optional "NOT … that's /other".
- Keep `name` a bare slug: `roast`, `sop`, `forge`. No spaces, no caps.

## 2. Body skeleton (use the subset the skill needs, in THIS order)

1. **Opening blockquote tagline** — right under the frontmatter: `> *Adapted from … / A Reframe Core deliverable …*`
2. `## What this does` (or `## What this skill does`) — plain-language purpose. Document skills state the exact output file paths here.
3. `## When to invoke — and when NOT to` — explicit invoke/don't-invoke fence, cross-referencing sibling skills (`that's /sop`). **Verify the sibling exists before naming it** — `ls .claude/skills/`. A redirect to a skill that isn't there dead-ends the run.
4. `## Inputs to read` — bulleted files to read first. Usually `CLAUDE.md` (the operator's identity and voice), `references/voice.md` if it exists, the cornerstone SOPs (only if relevant), and any bundled template/script ("clone, do not re-derive").
5. `## Process` — numbered `### Step N — Title` subsections. Skills that spawn agents start at `### Step 0 —` = the token/scope/cost gate.
6. `## Output` (or `## Output contract`) — the deliverable list + a "report back in one screen" spec.
7. A rules block — `## Rules` / `## Hard rules` / `## Guardrails` / `## Critical rules`. Numbered non-negotiables.
8. `## Bike Method posture` — Phase 1/2/3 ladder, ending with: "Phase advances only by explicit edit to `bike-method-phase:` in this frontmatter."
9. **Closing stamp** (document/deliverable skills): `> *A Reframe Core deliverable. Security, ethics, privacy — surfaced by design, not bolted on.*`

Pin exact output shapes with a fenced code block when the skill emits a fixed format (see roast's `## THE VERDICT`).

## 3. Voice (non-negotiable, every skill, every run)

- Read the operator's voice notes in `CLAUDE.md` (and `references/voice.md` if present) each run.
- Short sentences. Casual but professional. **No em dashes** — use periods, or an occasional ellipsis (`...`), not often.
- Bullets and numbered lists over paragraphs. Parenthetical asides are fine.
- Concrete numbers and named tools, not abstractions. No hype.
- Don't fake the operator's voice on external/client-facing content without a draft for their review first.

## 4. Spawning sub-agents (the parallel idiom)

- Spawn **all N agents in parallel in a single message** (one Agent call each), `subagent_type: general-purpose`.
- Paste the **same brief/frame** into every agent; give each a **distinct mandate**.
- Each agent returns a **fixed contract**: a stance/position, 3-5 bullets, and a score or `VERDICT` enum, under a word cap (e.g. "under 400 words").
- Keep **raw agent output out of chat**. Post a 2-3 line convergence note; the orchestrator (never an agent) makes the final call.
- **Adversarial verify** pattern (see roast): a second wave whose job is to *refute* each finding, returning `CONFIRMED / PARTIAL / REJECTED`. The verify pass may only **downgrade/fix**, never inflate.
- **Kit-wide research guardrail:** never web-search the operator, their business, or any named client. Research the *category*; feed specifics in from local files or the vault.
- **Scratch location:** any worker that writes files gets the session scratchpad path (the directory named in the orchestrator's system prompt) pasted into its prompt. Workers left to guess dump `tmp_*` dirs at the repo root. Durable output still follows the deliverables convention in §5.

## 5. Bundled files (only when the skill needs them)

- **Prose-only skills carry nothing** (roast, sop, level-up).
- **Document-emitting skills** bundle an HTML template and, if needed, a stdlib-only Python or Node script.
- Reference bundled files by path with a "clone it, do not rebuild" instruction: templates use `{{TOKEN}}` placeholders; keep the `<style>` block verbatim; delete instructional comments and unused sections.
- Invoke scripts by repo-root-relative path in fenced blocks, quoting paths that contain spaces. Always pair a script call with a graceful fallback ("if it errors, the MD/HTML are ready").
- Output location convention: deliverables land under `deliverables/{Company}/{Project}/` or `deliverables/{slug}-*.ext`; working artifacts in a `work/` subfolder.

## 6. Autonomy, cornerstones, honesty

- **Bike Method:** every built artifact ships with `bike-method-phase: 1` in frontmatter. It locks Phase 1 (the operator reviews before anything ships). Advances only by explicit edit.
- **L0–L4 autonomy** labels appear inline where relevant ("L2 autonomy: AI drafts; the operator reviews before it reaches a client").
- **Three cornerstones** (security / ethics / privacy): scan the task; read the matching `references/*-sop.md` only if relevant; include a cornerstones section only when concrete, and silently skip when not. Secrets stay in Doppler, never in generated code.
- **Never fabricate.** If the skill can't find something, it says so honestly rather than inventing rows/citations/files.
- **Trademark/attribution discipline:** opening blockquote credit + the `<source>-attribution:` frontmatter key when a pattern is borrowed.

## 7. Agent files (`.claude/agents/*.md`) — when a skill bundles a sub-agent

Differences from a SKILL.md:
- Frontmatter carries `tools:` (allowlist) and `model:` (e.g. `model: sonnet`), often `description: >-` folded style, plus the same `bike-method-phase` + attribution keys.
- Body opens with an `# H1 Title` (not a blockquote), then a one-line autonomy declaration.
- Layout: purpose → sources/inputs → `## Process` (numbered, with exact CLI + any gotchas) → `## Destination` → `## Definition of Done` (a concrete success threshold) → `## Cornerstones` → `## Bike Method — Phase 1`.
- The agent is addressed as a `subagent_type`; a skill is an orchestrator that spawns `general-purpose` agents inline.

## 8. Task contracts — when a skill's work runs unattended

- If the skill schedules, spawns, or emits anything that runs unattended (a scheduled job, a cron routine, a background agent), that artifact carries a four-line task contract in its header:

```
TASK: <one sentence - the outcome, not the activity>
GUARDRAILS: <what must NOT happen - scope fences, vendors, credentials, data rules>
EXIT CRITERIA: <how a stranger tells it's done - observable>
VERIFIER: <the concrete check that proves it - a command, a forced failure, a number to compare>
```

- Put the contract in the emitted artifact's header (script comment, workflow meta, agent brief). Interactive-only skills skip it - the conversation is the contract.
- The VERIFIER line must be runnable. "It ran without errors" is not a verifier; exit code 0 with rotten content is the failure this exists to catch.
