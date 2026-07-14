---
name: close-session
description: Use at the end of a session to save session notes, decisions, and identity updates before closing. Trigger on "close session", "end session", "we're done for now", "wrap up", "save everything before I close", or similar session-wrap language. Routes durable content to the Second Brain vault if one is configured, otherwise to decisions/log.md.
---

## What this skill does

The end-of-session save. Reviews what happened this session and writes the durable parts down instead of letting them vanish with the chat window. Where it writes depends on whether a **Second Brain** is configured (see `/second-brain`):

- **Vault configured** → session history goes to the vault; standing facts update the vault's profile page.
- **No vault** → decisions go to `decisions/log.md`; standing facts update `context/about-me.md` / `context/about-business.md`; a short session recap is offered but not force-filed.

**One run = the session gets closed out properly.** Nothing worth keeping should be lost to a chat that's about to disappear.

## What it is NOT

- Not a full vault reorg (orphan cleanup, dedup, MOC rebuilds). That's `/vault-lint`'s job, and only when a vault exists.
- Not a memory-spammer. The point is to route durable content to the right *durable* home (vault or `context/`), not to spawn a pile of memory files. Only touch memory if something structural changed that a future session needs as a pointer (rare — see Step 4).

## When it runs

- On-demand, any time the operator signals a session is ending.
- Skip if nothing happened worth recording (a purely exploratory chat, no decisions, no new facts, no action items) — say so plainly rather than manufacturing an entry.

## Execution

### Step 1: Review the session

Scan the conversation for:
- **Decisions made** — anything that belongs in `decisions/log.md` and isn't logged yet.
- **Durable facts** about the operator, the business, or working preferences that changed or were newly established.
- **New knowledge** — concepts worked out, sources gathered, pages worth creating (only relevant if a vault exists).
- **Action items / next steps** — what's left open for next time.

### Step 2: Check for a Second Brain

Read `context/second-brain.md`.

- **If it exists, `installed: true`, AND `vault_automation: enabled`** (Obsidian/markdown vaults) → note the `vault_path`, `log_file`, and `standing_page`. Proceed with the vault path (Step 3a).
- **If it exists but `vault_automation: disabled`** (Drive/Notion) → the built-in vault-writing is Obsidian/markdown-native and stays off for this type. Proceed with the no-vault path (Step 3b), and mention once that saving to their Drive/Notion store would be a build-your-own (the vault skills are a template) — don't nag.
- **If it's missing or `installed: false`** → no vault. Proceed with the no-vault path (Step 3b). Optionally mention once that `/second-brain` can set up persistent continuity (Obsidian recommended) — don't nag.

### Step 3a: Vault path — append a session log entry

Append to `{vault_path}/{log_file}`, following a consistent convention:

```
## [YYYY-MM-DD] session | Short title

- Decisions made: ...
- What was built / changed: ...
- Lessons learned: ...
- Next steps: ...
```

Read a couple of existing entries first and match their format. If the log file is empty or new, establish this format.

### Step 3b: No-vault path — route to repo files

- **Decisions** → append to `decisions/log.md` (the repo's decisions ledger).
- **Durable facts about the operator/business** → update `context/about-me.md` or `context/about-business.md` directly.
- **Session recap** → offer a short summary in chat. Don't force a session-log file into existence; that's what a vault is for. If the operator keeps asking for session history, that's the signal to suggest `/second-brain`.

### Step 4: Update standing pages if durable facts changed

- **Vault configured** → if something durable about the operator changed (preferences, business facts, working rules, voice), edit `{vault_path}/{standing_page}` directly so it stays the source of truth. If a genuinely new topic got real coverage, make sure it has its own note and is linked from the right hub.
- **No vault** → update the relevant `context/` file directly.

**Memory touch, only if warranted:** if something structural changed that a fresh session needs before it can find anything (a vault created or moved, a renamed path, a new standing pattern) — update the relevant pointer. Do not write a new memory file for content that now belongs in the vault or `context/`. When in doubt, don't write to memory.

### Step 5: Check the decisions log

Cross-check `decisions/log.md` against what actually got decided this session. Log anything missing — this file keeps its role as the decisions ledger whether or not a vault exists.

### Step 6: Close with a short recap

Report back, concisely:
- What got saved, and where (log entry, page updates, new notes, or repo files).
- Anything flagged but deliberately held back.
- What's still open for next time.

## Notes

- **Idempotent-ish.** Running it twice with nothing new should say "nothing new to save" — not duplicate the last entry.
- **Low friction by design.** This should read like the natural close of a session, not an interrogation. Infer from the conversation, then report what was done — don't fire a battery of questions.
- **Growth path:** once a vault exists and grows, a scheduled `/vault-lint` pass (orphans, dedup, health) is the natural next automation. Flag as a `/level-up` candidate if the vault gets large — don't build it preemptively.
