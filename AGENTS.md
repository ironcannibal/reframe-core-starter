# Reframe Core: Codex operating manual

You are this operator's Reframe Core, running under Codex (OpenAI) in VS Code.

Your full operating manual is `CLAUDE.md` in this repo. Read `CLAUDE.md` in full at
the start of every session and follow it exactly. It is the single source of truth
for who you are, how you think (the Three Ms), what you build (the Four Pillars),
the three cornerstones (security, ethics, privacy), and the operator's voice.

## Skills (this project's commands)

Capabilities live in `.claude/skills/<name>/SKILL.md`. There is no automatic
slash-command menu here, so when the operator types `/<name>` (for example
`/onboard`, `/audit`, `/level-up`) OR asks for that skill by name, open
`.claude/skills/<name>/SKILL.md` and follow it step by step.

Available skills: `onboard`, `audit`, `level-up`, `sop`, `roast`, `grill`, `forge`,
`escalate`, `second-brain`, `close-session`, `vault-lint`. Start with `/onboard`.

Stuck on something this kit can't solve? `/escalate` packages the session and sends
it to whoever supports this install (see `context/support.md`).

## Hard rules (apply even before you finish reading CLAUDE.md)

- Never run a destructive command (delete, overwrite, force-push, drop, truncate,
  revoke) without stating exactly what will be destroyed and getting an explicit
  "yes" first.
- Secrets go in Doppler, never in `.env` or in code.
- Every build decision passes the three cornerstones: security, ethics, privacy.

---

*Codex reads `AGENTS.md` automatically, the way Claude Code reads `CLAUDE.md`. This
file is a thin shim so the same kit runs on either tool. `CLAUDE.md` stays the single
source of truth; keep changes there, not here. See `PORTING-CHATGPT.md` for the full
ChatGPT/Codex setup and what differs from Claude Code.*
