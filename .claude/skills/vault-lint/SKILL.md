---
name: vault-lint
description: Runs a lint pass over the Second Brain vault — orphan pages, broken [[wikilinks]], contradictions, and coverage gaps. Use when the operator says "run the vault lint", "lint the vault", "/vault-lint", or on a periodic maintenance ritual once the vault has grown. Requires a local markdown/Obsidian Second Brain (see /second-brain); no-ops cleanly if none is configured.
three-ms-attribution: |
  Adapted from The Three Ms of AI™ © 2026 Nate Herk.
---

> *Adapted from The Three Ms of AI™. © 2026 Nate Herk. All rights reserved.*

## What this skill does

Keeps a knowledge vault healthy: finds orphan pages, broken links, contradictions, and gaps so the vault stays trustworthy as it grows. It's the maintenance counterpart to `/close-session` (which fills the vault) and only applies when a **Second Brain** is configured (see `/second-brain`).

**Drafts, does not auto-apply.** Every finding is written up for the operator to review and apply by hand. The vault holds identity and business content, not disposable notes — an "obvious" fix still waits for a human. This is the safe, manual default; wiring a scheduled trigger is a later, explicit choice.

## Requirements

- A Second Brain configured as `type: markdown` or `type: obsidian` in `context/second-brain.md` (local folders the script can walk).
- Google Drive / Notion vaults get continuity via `/close-session` but **not** this automated structural lint. If that's the configured type, say so and stop.

## What it is NOT

- Not auto-applying fixes. Even a missing link waits for review.
- Not a full rewrite/reorg tool. It flags; it doesn't restructure.
- Not scheduled by default. Run it manually. Once it's proven useful a few times, wiring a periodic trigger is a deliberate `/level-up` decision, not automatic.

## Execution

### Step 1: Run the deterministic scan

```
node scripts/vault-lint.mjs
```

The script resolves the vault path itself (from `context/second-brain.md`, or the `SECOND_BRAIN_VAULT` env var). It returns JSON:
- `fileCount`, `orphans` (zero-inbound-link pages, excluding the log file), `brokenLinks` (`[[targets]]` that don't resolve), `recentlyTouched` (pages modified in the last 14 days).
- Or `{ skipped: true, reason: ... }` if no local vault is configured — in that case, relay the reason and stop.

### Step 2: AI review pass — contradictions and gaps

Read every file in `recentlyTouched`, plus any file flagged in `orphans`/`brokenLinks`. Look for:

- **Contradictions** — two pages asserting different things about the same fact/decision.
- **Gaps** — a concept or entity referenced by name across 2+ pages but with no dedicated page of its own.
- **Missing cross-references** — pages that clearly relate but don't link to each other.

This is the part a script can't do — it needs to actually read and reason about content. Don't review the whole vault every run; recently-touched + flagged files keep this fast and cheap as the vault grows.

### Step 3: Draft findings, don't apply them

For each finding, draft the specific fix (which line, which link to add, which page to create) but do not edit the target file. Suggested fixes are proposals, not actions.

### Step 4: Record the findings

Append to the vault's log file (`{log_file}` from the config, default `log.md`), matching the existing entry convention:

```
## [YYYY-MM-DD] lint | Findings

**Scanned:** {fileCount} files.

**Orphans:** {list, or "none"}
**Broken links:** {list with file + target, or "none"}
**Contradictions:** {list with the two conflicting pages + a one-line description, or "none"}
**Gaps:** {list of concepts worth a dedicated page, or "none"}

**Suggested fixes (not yet applied):**
- {specific, actionable — "add [[X]] to Y's Related section", "create a page for Z", etc.}
```

### Step 5: Close with a short recap

Report back in chat: counts (files scanned, orphans, broken links, contradictions, gaps) and point at the log entry. If nothing was found, say so plainly — don't manufacture findings to justify the run.

## KPI

**Bucket:** Less cost. **Metric:** open orphan/broken-link/contradiction count trending toward zero across runs, and manual vault-maintenance time trending down.

## Notes

- The script never hardcodes a vault path — it reads `context/second-brain.md` (or `SECOND_BRAIN_VAULT`). If the vault moves, update the config, not the script.
- `brokenLinks` can also catch links pointing at files *outside* the vault root (e.g. a stray file left in the vault) — worth a manual look, not just a typo'd link name.
