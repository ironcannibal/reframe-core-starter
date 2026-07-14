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

**This module is built for Obsidian.** Lead with that. The two vault skills (`/close-session`, `/vault-lint`) are Obsidian/markdown-native — they work out of the box on a local markdown vault and don't on anything else. There are two support tiers; be upfront about which is which.

### Tier A — fully supported (local markdown, automation ON)

**1. Obsidian** ⭐ *recommended*
- **Pros:** Free. It's a folder of plain markdown files, so `/close-session` and `/vault-lint` work natively with zero extra wiring. Adds `[[wikilinks]]`, graph view, backlinks, plugins, mobile app. Local-first, private by default. It's what this whole module was designed around.
- **Cons:** A real app to learn (not much — it's basically a notes folder with superpowers).
- **Best for:** Almost everyone. This is the default recommendation. Free, private, and the automation just works.

**2. Plain markdown folder** (even lighter)
- **Pros:** Zero install. Just a folder of `.md` files. Same full automation support as Obsidian (it's the same format). Fully local and private.
- **Cons:** No UI, graph, or mobile app — you edit in whatever text editor you like. You can point Obsidian at this same folder later and lose nothing.
- **Best for:** People who want the benefits with no new software at all.

### Tier B — store only, automation OFF (build-your-own)

**3. Google Drive / 4. Notion** (only if they already live there and won't switch)
- **What works:** You can keep a knowledge store there. The Reframe Core can *read* Drive via MCP.
- **What does NOT:** `/close-session` and `/vault-lint` are Obsidian/markdown-native and stay **disabled** for these — they won't run. Drive is Google Docs (not markdown); Notion needs API wiring and its export is clunky (lock-in risk).
- **The deal:** You get the concept, not the built-in automation. If you want session-save and lint on Drive/Notion, you'd build your own versions (the existing skills are a clear template to copy). This skill will record the choice and tell the vault skills to stand down.
- **Best for:** People locked into Drive/Notion who accept DIY automation.

**The honest default:** recommend **Obsidian** unless they have a strong reason not to — free, private, markdown-native, full automation. Plain markdown if they want zero new software. Only route to Drive/Notion if they insist, and be clear the vault automation is off and DIY from there.

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
type: obsidian | markdown | gdrive | notion
vault_path: <absolute path to the vault, or Drive folder / Notion workspace name>
log_file: log.md
standing_page: profile.md
vault_automation: enabled   # enabled ONLY for obsidian/markdown; disabled for gdrive/notion
---

# Second Brain — config

This file tells the Reframe Core where your knowledge vault lives.
When `vault_automation: enabled`, `/close-session` writes session history here
and `/vault-lint` checks its health. When `disabled` (Drive/Notion), both vault
skills stand down and you build your own if you want them.
Edit the frontmatter above if the vault ever moves.
```

Set `vault_automation: enabled` **only** for `obsidian` and `markdown` (local folders the skills natively support). For `gdrive`/`notion`, set it `disabled` — the vault skills won't run, and that's by design.

Then update `connections.md`: Second Brain row → status `✓`, mechanism matching the type.

## Step 6: Confirm and hand off

Short recap. Match it to the tier they chose.

**Tier A (Obsidian / markdown):**
- Where the vault lives and what got created.
- That `/close-session` will now save to it at the end of sessions.
- That `/vault-lint` will check its health.
- Next step: *"Run a session, then try `/close-session` to see it capture what happened."*

**Tier B (Drive / Notion):**
- Where the store lives, and that the choice is recorded.
- Plainly: the built-in vault skills (`/close-session`, `/vault-lint`) are **off** for this type — they're Obsidian/markdown-native.
- If they want that automation, the existing skills are a template to copy and adapt to their store (or switch to Obsidian any time and it all turns on).

## Rules

- **Optional means optional.** If they hesitate, default to "wait." Never make someone feel behind for not having a second brain.
- **Obsidian is the recommendation.** Free, private, markdown-native, full automation. Steer there unless they have a real reason not to.
- **Confirm before creating files or folders on disk.** State the exact path, wait for yes.
- **No false promises on Drive/Notion.** Never imply they get `/close-session` or `/vault-lint`. State clearly the automation is off and DIY. `vault_automation: disabled` in the config enforces it.
- **One config file.** Everything routes through `context/second-brain.md`. Don't scatter paths across skills.
- **Re-runnable.** `/second-brain status` reports the current config; `/second-brain` again lets them change or remove it.
