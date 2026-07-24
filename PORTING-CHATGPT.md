# Running Reframe Core on ChatGPT (Codex in VS Code)

Reframe Core ships tuned for Claude Code, but it runs just as well on ChatGPT. The
ChatGPT-native peer of Claude Code is **OpenAI Codex**: ChatGPT's coding agent. Same
account, same intelligence, except it can read and edit files, run the terminal, and
use git, right inside VS Code. That is what lets this whole kit run on it.

This repo already includes the one file that makes the port work (`AGENTS.md`), so
there is nothing to build. Clone, open, and run.

## What you need

1. A paid ChatGPT plan (Plus, Pro, or Business). Codex is included there. A free
   account can't run it.
2. VS Code.
3. Git.

## 1. Put ChatGPT (Codex) inside VS Code

1. Open VS Code.
2. Click the Extensions icon in the left bar (the four squares).
3. Search for **Codex** and install the one published by **OpenAI**.
4. A Codex panel opens. Click **Sign in with ChatGPT** and log in with your normal
   ChatGPT account.
5. That panel is now your agent, the same way Claude Code is a panel you work in.

Prefer the terminal? Run `npm i -g @openai/codex`, then `codex` inside the project
folder. Same tool, no VS Code required.

## 2. Get the kit

In VS Code: **File > Open Folder**, pick an empty folder, open the terminal
(`` Ctrl+` ``), and clone this repo into it (grab the URL from the green **Code**
button on the repo page):

```
git clone <this-repo-url> .
```

## 3. There is no step 3

`AGENTS.md` is already in the repo. Codex reads it automatically, the way Claude Code
reads `CLAUDE.md`. It points Codex at the full operating manual (`CLAUDE.md`) and
explains how the skills work. Nothing to add or configure.

## 4. Run it

1. Open the project folder in VS Code.
2. In the Codex panel, type `/onboard` (or plainly: "run the onboard skill").
3. Codex reads `AGENTS.md`, opens `.claude/skills/onboard/SKILL.md`, and walks the
   7-question setup, the same as Claude Code.
4. From there: `/audit` on day 7, `/level-up` on day 14. Same skills, same cadence.

The one thing you'll notice: Codex asks permission before it runs a command (its
sandbox). That is intentional. Approve it when it wants to write your setup files.

## What carries over, and what differs

| Piece | On ChatGPT (Codex) |
|---|---|
| `CLAUDE.md` operating manual | Yes, via the included `AGENTS.md` shim |
| `context/`, `references/`, voice, decisions log | Yes, identical (just files) |
| Skills (`/onboard`, `/audit`, `/level-up`, `/sop`, `/roast`) | Yes. Invoke by name; Codex reads the SKILL.md |
| File editing, git, terminal, Doppler secrets | Yes, identical |
| Four Pillars 1-3 (Context, Connections, Capabilities) | Yes |
| Slash commands as an automatic menu | Not automatic. Type `/onboard` or "run the onboard skill" and it works. See power-ups below. |
| Prebuilt cloud connectors (a vendor's Gmail / Calendar / Drive) | Do not carry over. Wire tools with Codex's own MCP (`codex mcp`) or direct APIs, keys in Doppler. |
| Cadence / autonomous runs (Pillar 4) | Different plumbing. Codex has its own scheduling and cloud path. Defer until the manual workflow works, same as the kit already advises. |

## Optional power-ups (skip on day one)

- **Real `/audit` slash commands.** Codex supports custom prompt files that appear as
  slash commands. Create one small file per skill whose body is just "Follow
  `.claude/skills/audit/SKILL.md`." Check where your Codex version keeps its prompts
  folder. Invoking a skill by name already works without this.
- **Connections.** Add tools with `codex mcp` (Codex's MCP manager) or with direct API
  calls, following the kit's API-first rule and keeping keys in Doppler.

## Under the hood

Claude Code reads `CLAUDE.md`; Codex reads `AGENTS.md`. Both are plain-text instruction
files at the repo root. The `AGENTS.md` here is a thin shim that defers to `CLAUDE.md`,
so there is a single source of truth and nothing drifts. Everything else in the kit
(the `context/` files, the `references/`, the skills, the decisions log) is plain files
and behaves identically under either tool. One kit, either runtime.
