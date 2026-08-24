---
name: forge
description: Build a new Reframe Core skill using the overseer+agents pattern — a strong overseer interviews you, writes a spec, fans out cheaper worker agents to draft in parallel, adversarially verifies, and emits a convention-perfect .claude/skills/<name>/ bundle. Use when the operator says "/forge X", "forge a skill for X", "build me a skill for X", "new skill for X", "turn this into a slash command", or when /level-up's Machine phase needs a local scaffolder. NOT for a one-off prompt you'll run once — that's just a prompt, not a skill.
argument-hint: "[what the new skill should do]"
bike-method-phase: 1
overseer-attribution: |
  Overseer+agents orchestration adapted from Nate B Jones' fleet demo, sharpened with Sandipan Bhaumik's multi-agent reliability patterns. Rebuilt for the Reframe Core.
---

> *An overseer+agents build tool. One strong model plans and assembles; cheap workers draft in parallel; an adversarial gate keeps it coherent.*

## What this does

`/forge` builds a new skill the way a senior engineer runs a small team. A **live overseer** (this session, on the strongest model you have) interviews the operator, writes a spec, then hands scoped slices to **worker agents** who draft in parallel on right-sized cheaper models. The overseer reassembles the slices into one coherent SKILL.md, runs an **adversarial verify wave** to break it, applies the fixes, and writes the bundle to `.claude/skills/<name>/`.

The economics are the point: the expensive model spends its tokens only on judgment (interview, decomposition, assembly, the final call). The mechanical drafting runs cheap and parallel. More agents when it's faster and cheaper; fewer when more is just more.

The output is a ready-to-test skill folder: `SKILL.md` plus any template, script, or bundled sub-agent the new skill needs.

L2 autonomy: `/forge` drafts the skill; the operator reviews and tests before it ships. Every skill it builds locks to Bike Method Phase 1.

## When to invoke — and when NOT to

**Invoke** when the target is a *repeatable capability worth a slash command* — something the operator will run more than once, with a clear trigger, inputs, steps, and output. Building a skill, an agent file, or a document-emitting deliverable engine. Good first candidates: a weekly report you assemble by hand, a follow-up email you write the same way every time, a checklist you run before every client meeting.

**Do NOT invoke** for a run-once task or a saved prompt template. If the operator will use it a single time, that's a prompt, not a skill — hand them the prompt and stop. Reuse `/level-up`'s artifact ladder (prompt-only → deterministic skill → AI-assisted skill → sub-agent) and default to the cheapest rung that solves the problem. Over-building a skill for a one-off is the anti-pattern this gate exists to catch.

## Inputs to read

- The operator's invocation (`$ARGUMENTS`) — what the new skill should do.
- `forge/conventions.md` (in this skill folder) — the house authoring cheat-sheet. Read it, and paste it into every worker's brief. Do not re-derive the conventions.
- `forge/skill-template.md` (in this skill folder) — the `{{TOKEN}}` skeleton the overseer fills at assembly. Clone it; do not rebuild the section order.
- `CLAUDE.md` — the operator's identity, voice notes, and priorities (filled by `/onboard`). The new skill's operator-facing sections match that register. If `references/voice.md` exists, read it too.
- `.claude/skills/*/SKILL.md` frontmatter — the existing skills, to check trigger collisions.
- `references/ai-ethics-sop.md`, `references/privacy-sop.md`, `references/prompt-injection-sop.md`, `references/security-sop.md` — only if the new skill touches customer data, AI-to-human output, external content, or access/secrets.

## Process

### Step 0 — Gate: model check + artifact altitude

Two checks, in one short message, before anything spins up:

1. **Model.** The overseer should be the **strongest model available to this account at high effort or above**. Run `/model` to see the current one. If the session is on a lighter model, tell the operator in one line how to switch (`/model opus` or the top tier they have access to, effort set to high or xhigh), then re-run. Do not fan out on a weak overseer — the whole pattern depends on a strong manager holding the picture.

   *Never pin a version number here.* The bare tier alias (`opus`, not `opus 5`) always resolves to the newest model in that tier, so this gate stays correct when the next model ships.
2. **Altitude.** Confirm the ask is genuinely a skill, not a one-off. State the artifact rung you're building (skill / agent file / deliverable engine). If it reads like a run-once prompt, hand the operator the prompt and stop.

State in one line: the rung, and that this is a small overseer+agents run (usually 3-7 workers, the overseer sizes it at Step 2).

### Step 1 — Interview → the Skill Spec

Interview the operator like you'd brief a senior engineer. Ask only what's missing, in one tight batch (use one AskUserQuestion where it fits). Explain any term the operator may not know; most people forging their first skill have never written one.

1. **Name + triggers** — the `/slash` command and the literal phrases that should fire it. Check them against the existing skills for collision; flag any overlap now.
2. **What it does / what it's NOT** — one clause of purpose, plus the sibling skill it should redirect to for the wrong use.
3. **Inputs** — what it reads (files, vault pages, the invocation, web).
4. **Process** — the step-by-step. Does it spawn its own sub-agents? Does it need a template, a script, or a bundled agent file?
5. **Output** — the deliverable(s), the format, and where files land.
6. **Autonomy** — L0-L4. (Default: L2, Bike Method Phase 1.)

Write the answers into a single **Skill Spec** — a short, complete brief. This is the shared context every worker gets. Do not skip it; a worker blind to the spec drafts a slice that won't fit.

### Step 2 — Decompose + fan out workers

**First, size the fan-out.** Ask the governing question out loud: *what produces the best result for the least token burn?* Split the new skill into independent slices, and for each write a **worker spec** — `{prompt, model, effort}` — with model and effort chosen from that slice's difficulty:

- **Model:** `sonnet` by default. `opus` when the slice needs real reasoning (intricate process logic, a script, a bundled agent). `haiku` only for a trivially mechanical slice (a boilerplate frontmatter fill).
- **Effort:** `low` for deterministic template-fills → `high`/`xhigh` for slices that must think.

State the chosen worker count and a one-line rationale so the sizing is visible.

**Then fan out.** If the Workflow tool is available, use it (it is the only path that sets per-worker `model` AND `effort`). Otherwise spawn the workers with the Agent tool, all in one message, passing `model` per worker. Every worker is handed the **same Skill Spec + the full contents of `conventions.md`**, plus its one slice to draft. Workflow pattern:

```js
// args = { spec, conventions, slices: [{key, prompt, model, effort}, ...] }
const drafts = await parallel(args.slices.map(s => () =>
  agent(`${args.spec}\n\n${args.conventions}\n\nDraft ONLY this slice: ${s.prompt}`,
        { label: `draft:${s.key}`, model: s.model, effort: s.effort, schema: SLICE_SCHEMA })
))
return drafts
```

*Illustrative default decomposition for a simple prose skill (adapt count/model/effort up or down):*
- frontmatter + trigger-formula `description` + opening blockquote — *deterministic, haiku/sonnet, `low`*
- the `Process` body — *heaviest, sonnet/opus, `high`-`xhigh`; split into multiple workers if the process is long*
- `Inputs to read` + `When to invoke` + `Rules` + `Bike Method posture` + closing stamp — *sonnet, `medium`*
- *(only if the new skill emits documents/agents)* an HTML template, a stdlib-only Python script, or a bundled sub-agent `.md` (with `tools:`/`model:` frontmatter) — *each its own worker, opus + `high` when intricate*

Keep raw worker output out of chat. Post a one-line note that the drafts are in.

### Step 3 — Assemble (overseer)

Clone `skill-template.md` and fill every `{{TOKEN}}` from the drafted slices. This is the manager-holds-the-whole-picture step, and it is not a paste job:

- Enforce the house section order and the frontmatter formula.
- **Reconcile cross-slice contradictions.** The `description` triggers must match what the `Process` actually does. The `Rules` must match the `Process`. The `Inputs to read` must name every file the `Process` references. Workers can't see each other — you can. Fix the seams.
- Enforce voice: match the operator's register from `CLAUDE.md` (and `references/voice.md` if present) in the new skill's operator-facing sections.

### Step 4 — Adversarial verify wave

Run 2-3 refuters concurrently (`model: sonnet`, `effort: high` — verification is judgment work). Each one's job is to *break* the assembled draft and return `VERDICT = CONFIRMED / ISSUE` + the specific fix. Cover these angles:

- **Convention conformance** — frontmatter formula, section order, no stray `model:`/`tools:` keys, `bike-method-phase: 1`, attribution key, voice.
- **Trigger collision** — does the `description` overlap any existing skill's triggers (including `/forge` itself)? Cross-check the real skill list.
- **Executability** — will the Process actually run? Are referenced files/paths real? Is every sub-agent fan-out a single-message parallel spawn? Is the Step-0 gate present? No fabricated tools or files.

The verify pass may only **downgrade or fix**, never inflate. Apply the surviving fixes. If a refuter finds nothing real, say so.

### Step 5 — Write the bundle + report one screen

Write the assembled `SKILL.md` (plus any template/script/agent file) to `.claude/skills/<name>/`. Then report to the operator in one screen:

- The path written.
- The exact trigger phrases.
- The one line to type to test it.
- The L2 reminder: review and test before relying on it; it's locked to Bike Method Phase 1.
- Suggest logging a decision to `decisions/log.md`.

## Output

1. A new skill folder `.claude/skills/<name>/` with a convention-perfect `SKILL.md` and any bundled assets.
2. A one-screen chat report: path, triggers, the test command, the L2/Phase-1 reminder.
3. The suggestion to log the build in `decisions/log.md`.

## Rules

- **The overseer never drafts the slices itself.** It interviews, decomposes, assembles, and judges. Drafting is the workers' job — that's the economics. (The overseer may fix seams at assembly.)
- **Every worker gets the full Skill Spec + `conventions.md`.** No worker drafts blind. This is the mitigation for sub-agents not seeing sibling work.
- **The verify gate is not optional.** Fan-out gives throughput; the gate gives correctness. Never skip it to save tokens.
- **Right-size every worker.** Model and effort match the slice's difficulty. Haiku only for trivial. Don't burn the top model on a frontmatter fill; don't run xhigh on a boilerplate list.
- **Never fabricate.** If the interview left a gap, ask — don't invent a Process step, a file path, or a trigger. A generated skill that references a file that doesn't exist is a failure.
- **Cornerstones at design time.** If the new skill spawns agents or runs scripts, secrets stay in Doppler (see `references/doppler-secrets.md`), never in generated code. If it reads external/web content, cite `references/prompt-injection-sop.md` in the new skill. If it touches client or vault data, stamp the ethics/privacy checklist. Surface these only when concrete; silently skip when not.
- **Bike Method ships into every artifact.** `bike-method-phase: 1` in the generated frontmatter, always. The new skill starts on training wheels.
- **Voice match.** Operator-facing sections use short sentences, no em dashes, concrete tools and numbers.

## Bike Method posture

- **Phase 1 — Training wheels (current).** The operator reviews and tests every forged skill before it's relied on. `/forge` writes the file; the operator runs it, reads it, edits it.
- **Phase 2 — Guided.** `/forge` builds and self-verifies, the operator skims-and-approves. Advance only after several forged skills land clean without rework.

Phase advances only by explicit edit to `bike-method-phase:` in this frontmatter.

---

> *A Reframe Core build tool. Security, ethics, privacy — surfaced by design, not bolted on.*
