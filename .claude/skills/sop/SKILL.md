---
name: sop
description: Draft a structured internal SOP from a free-form description. Use when you say "/sop X", "draft an SOP for X", right after walking through a manual process worth capturing, or during a Reframe Core setup call when a client process surfaces.
bike-method-phase: 1
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

> *Adapted from The Three Ms of AI™. © 2026 Nate Herk. All rights reserved.*

## What this skill does

Turns your free-form description (dictated or typed) into a structured, voice-matched SOP. Writes to `references/sops/{slug}.md`, version-tracked in git. Logs first creation to `decisions/log.md`.

L2 autonomy: AI drafts, you review and edit before it counts as shipped.

## When to invoke

- You say `/sop X`, "draft an SOP for X", or "write up an SOP for ..."
- Right after you walk through a manual process you'd want captured
- During a Reframe Core setup call when a client process surfaces

## Inputs to read

- Your free-form description (required, from the invocation)
- `references/voice.md` (voice match — always)
- `references/security-sop.md`, `references/ai-ethics-sop.md`, `references/privacy-sop.md`, `references/prompt-injection-sop.md` — read **only** when the SOP touches their domain AND the file exists (see Step 2)
- Existing SOPs in `references/sops/*.md` — read as style examples when present

## Process

### Step 1 — Listen, don't interrogate
Draft from what you were given. Don't ask 5 clarifying questions. One question max, and only if something is genuinely blocking.

### Step 2 — Classify cornerstone relevance
Scan the description for triggers:
- **Security:** credentials, API keys, secrets, access, auth, third-party tools
- **Ethics:** AI output to humans, content moderation, automated decisions about people
- **Privacy:** PII, customer data, contact info, recordings, retention

If a trigger fires, attach a short cornerstone checklist to the draft (read the matching cornerstone SOP first if one exists). If none fire, skip the cornerstones section entirely. Don't pad SOPs with empty checklists.

### Step 3 — Draft the SOP

```markdown
# {Title — short, imperative, action-noun}

**Purpose:** one sentence, why this exists.
**Scope:** what's covered, what's explicitly not.
**Owner:** you (or override).
**Version:** 0.1
**Last-reviewed:** YYYY-MM-DD (today)

## Prerequisites
- Tools, access, accounts, knowledge needed before starting.

## Steps
1. Imperative voice. Atomic actions. One thing per step.
2. ...

## Success criteria
- How you know it worked.

## Failure modes
- What commonly breaks, and the fix.

## Cornerstones
(Only when Step 2 flagged relevance. Omit the section otherwise.)
- **Security:** ...
- **Ethics:** ...
- **Privacy:** ...
```

### Step 4 — Voice match
Apply `references/voice.md`:
- Short sentences. **No em dashes.** Use periods or ellipses (`...`).
- Bullets and numbered lists over paragraphs.
- Concrete tools, numbers, named systems. No "leverage synergies" abstractions.
- Match the operator's register.

### Step 5 — Write
- File: `references/sops/{kebab-case-slug}.md`
- Create `references/sops/` if it doesn't exist.
- If the target file already exists: ask whether to **version-bump** (0.1 → 0.2, add a changelog stub at the bottom) or **create a new file** with a more specific slug.

### Step 6 — Log on first creation
Append to `decisions/log.md`:

```
## YYYY-MM-DD — SOP drafted: {title}

**Decision:** new SOP at [references/sops/{slug}.md](references/sops/{slug}.md), v0.1.

**Why:** {one line from the SOP's Purpose}

**Owner:** you.
```

Skip the log entry for version bumps.

### Step 7 — Report back
One screen, no fluff:
- File path
- Version
- Cornerstones flagged (or "none")
- Suggested next review date (default: +90 days)
- Cycle time (rough — invocation to draft)

## Bike Method posture

- **Phase 1 — Training wheels (current).** You review every draft before it counts as shipped. Stay here until 5+ clean SOPs land without major rework.
- **Phase 2 — Guided.** Skill drafts, you skim-and-approve with minimal edits.
- **Phase 3+.** Not appropriate for a craft skill like this. Voice match and cornerstone judgment must stay in your hands.

Phase advances only by explicit edit to `bike-method-phase:` in this file's frontmatter.

## KPI tracking

After each run, briefly surface:
- **Cycle time:** invocation → reviewable draft. Target <10 min (most of this is you dictating; AI step is seconds).
- **Weekly throughput:** count of `references/sops/*.md` files. Target ≥1/week.

Ties to the Three Buckets: Cut costs (your time) + Make each customer worth more (resellable deliverable on the audit/project rungs).

## Critical rules

1. **One invocation = one SOP draft.** Don't batch-generate.
2. **Voice match is non-negotiable.** Re-read `references/voice.md` every run.
3. **Cornerstones attach only when relevant — silently skip when not.**
4. **Read-only on everything except `references/sops/{slug}.md` and `decisions/log.md`.**
5. **Stay in Phase 1-2 of the Bike Method.** Don't autonomize a craft skill.

---

> *The Three Ms of AI™ is a trademark of Nate Herk. © 2026 Nate Herk. All rights reserved.*
