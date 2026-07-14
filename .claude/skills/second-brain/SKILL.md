---
name: second-brain
description: Use when the operator wants to set up (or learn about) a second brain — a long-term knowledge vault the Reframe Core reads and writes. Trigger on "/second-brain", "set up my second brain", "what's a second brain", "connect a knowledge vault", "I want session notes to persist", or when /onboard offers it at the end of Day 1. Teaches the concept, compares the options, then optionally installs and wires it into /close-session and /vault-lint.
argument-hint: "[optional: 'explain' | 'install' | 'status']"
---

## What this skill does

Walks a complete newcomer from "what even is a second brain?" to a wired, working knowledge vault — or a clean decision to wait. It is the setup wizard for the **optional Second Brain module**. Nothing else in the kit assumes a second brain exists; this skill is what turns it on.

Two skills depend on what this one writes:
- **`/close-session`** — saves session notes, decisions, and standing-fact updates to the vault instead of losing them to a closed chat window.
- **`/vault-lint`** — periodically checks the vault for orphan pages, broken links, and contradictions.

Both stay dormant until this skill records a vault. The config it writes lives at `context/second-brain.md`.

## The golden rule

**Never push someone into a second brain they don't want.** Plenty of operators run a great Reframe Core with zero vault — memory + `context/` + `decisions/log.md` is already a working brain. A second brain is an *upgrade* for people who (a) have real accumulated knowledge to organize, or (b) want session-to-session continuity that outlives the chat. If they're not there yet, "wait" is a perfectly good answer. Say so.

## Step 1: Explain what a second brain is (plain language)

Lead with this, in plain terms — no jargon:

> A **second brain** is a personal knowledge vault: a set of linked notes that hold what you know, decide, and learn, so it compounds instead of evaporating. Your Reframe Core already has a *working* memory (this repo + its memory files). A second brain is the *long-term* layer next to it — the place durable facts, meeting notes, and session history live so they're never trapped in a chat that's about to close.
>
> The payoff: when a session ends, `/close-session` writes what happened into the vault. Next time, your Reframe Core reads from it. Your knowledge grows week over week instead of resetting.

Then ask if they want the options, or already know they want one.

## Step 2: Lay out the options (with honest pros/cons)

Present these four. Match to the person: non-technical → markdown folder or Google Drive; already-organized notetaker → Obsidian or Notion.

**1. Plain markdown folder** (simplest)
- **Pros:** Zero install. Just a folder of `.md` files. Fully local, fully private, works with every tool here including `/vault-lint`. Portable forever.
- **Cons:** No fancy UI, no graph view, no mobile app. You edit in whatever text editor you like.
- **Best for:** Anyone who wants the benefits with no new software.

**2. Obsidian** (recommended for most)
- **Pros:** Free. It's *also* just a folder of markdown files, so `/vault-lint` works natively. Adds `[[wikilinks]]`, a graph view, backlinks, plugins, mobile app. Local-first (private by default).
- **Cons:** A real app to learn. Slight overkill if you'll only ever keep a handful of notes.
- **Best for:** Operators who want their knowledge to feel like a connected web and will actually tend it.

**3. Google Drive** (if you already live there)
- **Pros:** Already in your stack, synced everywhere, sharable. The Reframe Core can reach it via the Google Drive MCP.
- **Cons:** Not markdown-native (Google Docs), so the automated `/vault-lint` link/orphan scan doesn't apply the same way. Continuity works; the structural lint is manual.
- **Best for:** People whose docs already live in Drive and who don't want a new tool.

**4. Notion** (if you already live there)
- **Pros:** Great UI, databases, already popular. Sharable and multiplayer.
- **Cons:** Not local markdown, needs API wiring for the Reframe Core to read/write, and `/vault-lint`'s automated scan doesn't apply. Lock-in risk (export is clunky).
- **Best for:** Teams already standardized on Notion.

**The honest default:** if they have no strong preference, recommend **Obsidian** (free, markdown-native, full tool support) or a **plain markdown folder** if they want zero new software. Flag clearly that Drive/Notion give continuity but not the automated lint.

## Step 3: Install now, or wait?

Ask directly:

> Want to set one up now, or note it as a "later" and move on? There's no penalty for waiting — everything else in your Reframe Core works without it.

If **wait**: write nothing to config. Add one line to `connections.md` (Second Brain row → status `○ planned`) so `/audit` remembers to nudge later. Tell them to run `/second-brain` any time. Done.

If **install**: continue to Step 4.

## Step 4: Setup questions (only if installing)

Keep it to the minimum. Ask in one batch where possible.

1. **Which option** (from Step 2)?
2. **Where does it live?** The full path to the vault folder (for markdown/Obsidian, e.g. `C:\Users\you\MyVault` or `/Users/you/MyVault`); for Drive/Notion, the folder name or workspace.
3. **What's the log file called?** Default `log.md` — this is where `/close-session` appends dated session entries. Create it if it doesn't exist.
4. **Is there a standing "about me" page** the Reframe Core should keep as the source of truth for durable facts (your profile, preferences, voice)? Default: create one named `profile.md`. `/close-session` edits this directly when something durable changes.

For a **markdown or Obsidian** vault, offer to create the folder, `log.md`, and `profile.md` if they don't exist yet — with an explicit confirmation before creating anything on disk.

## Step 5: Write the config

Create `context/second-brain.md` with this exact frontmatter shape (the two dependent skills and the lint script read it):

```markdown
---
installed: true
type: markdown | obsidian | gdrive | notion
vault_path: <absolute path to the vault, or Drive folder / Notion workspace name>
log_file: log.md
standing_page: profile.md
lint_supported: true   # true for local markdown/obsidian; false for gdrive/notion
---

# Second Brain — config

This file tells the Reframe Core where your knowledge vault lives.
`/close-session` writes session history here; `/vault-lint` checks its health.
Edit the frontmatter above if the vault ever moves.
```

Set `lint_supported: true` only for `markdown` and `obsidian` (local folders the lint script can walk). For `gdrive`/`notion`, set it `false` — continuity works, automated structural lint does not.

Then update `connections.md`: Second Brain row → status `✓`, mechanism matching the type.

## Step 6: Confirm and hand off

Short recap. Three things:
- Where the vault lives and what got created.
- That `/close-session` will now save to it at the end of sessions.
- That `/vault-lint` will check it (or, for Drive/Notion, that lint is manual for now).

Suggest the natural next step: *"Run a session, then try `/close-session` to see it capture what happened."*

## Rules

- **Optional means optional.** If they hesitate, default to "wait." Never make someone feel behind for not having a second brain.
- **Confirm before creating files or folders on disk.** State the exact path, wait for yes.
- **Honesty about lint.** Don't imply Drive/Notion get the automated `/vault-lint` scan. They get continuity; the structural lint is markdown/Obsidian only.
- **One config file.** Everything routes through `context/second-brain.md`. Don't scatter paths across skills.
- **Re-runnable.** `/second-brain status` reports the current config; `/second-brain` again lets them change or remove it.
