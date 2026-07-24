# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-07-24 — Dual-runtime kit: run on Claude Code or ChatGPT (Codex), don't fork

**Decision:** Ship one kit that runs on both Claude Code and ChatGPT (via OpenAI's Codex extension for VS Code), rather than maintaining a separate ChatGPT-specific repo. Support Codex by adding a thin `AGENTS.md` shim (Codex auto-reads it, the way Claude Code auto-reads `CLAUDE.md`) plus a `PORTING-CHATGPT.md` walkthrough. `CLAUDE.md` stays the single source of truth.

**Why:** The real delta between the two runtimes is tiny: one instruction-file name (`CLAUDE.md` vs `AGENTS.md`), skills invoked by name instead of an automatic slash-command menu, and connectors/cadence that use each tool's native plumbing. That is one shim file plus a page of docs. A fork would duplicate ~30 files to change one filename and add three caveats, and carry a permanent double-maintenance tax on a kit that is still evolving. Single source of truth beats a fork that drifts. It is also a positioning win: the kit runs on whichever AI the operator already pays for.

**Alternatives considered:** (1) Fork a separate ChatGPT-reframe-core-starter repo — rejected: maintenance tax, drift, delta too small to justify. (2) Add only `AGENTS.md` and nothing else — rejected: a ChatGPT user would hit the connector/cadence differences with no docs and think the kit was broken. Revisit the fork only if the Codex path genuinely diverges (per-skill prompt files, Codex-only cadence, a config that matters).

**Owner:** Fresh Start Marketing.
