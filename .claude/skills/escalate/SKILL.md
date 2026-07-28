---
name: escalate
description: Package everything about the current session and project into one self-contained markdown file and send it to the human who supports this install. Use when you say "/escalate", "escalate this", "send this to support", "I'm stuck, get me help", "ask my consultant", or when something is broken or bigger than this Reframe Core can handle. NOT for a question the Core can just answer — try that first.
argument-hint: "[optional: one line on what you need help with]"
bike-method-phase: 1
---

> *A freshstarts.io capability. Security, ethics, privacy — surfaced by design, not bolted on.*

## What this skill does

Turns a stuck session into **one markdown file a human (and their AI) can act on cold.**

The Core sweeps this session and this project, confirms with you what you actually need, asks for your own notes, strips every secret, and writes a packet to `escalations/YYYY-MM-DD-{slug}.md`. Then it prepares the email — a draft in your own mail account if one is wired, otherwise a prefilled `mailto:` with the packet on your clipboard.

The packet is written to be **uploaded into an AI on the other end**. That's why it carries the connections table, the environment, the errors verbatim, and everything already ruled out. The person supporting you drops the file in and picks up mid-problem instead of asking you twenty questions.

Who it goes to is configured in `context/support.md`.

L2 autonomy: the Core drafts the whole packet. You approve every line before anything leaves this machine. Nothing sends itself.

## When to invoke — and when NOT to

**Invoke when:**
- Something is broken and the Core has genuinely run out of moves
- A connection won't authenticate and the fix needs someone with access you don't have
- The work in front of you is bigger than this kit (that's a project, not a bug)
- You just want a human to look at it

**Do NOT invoke when:**
- The Core can answer the question itself. Try that first, always.
- You want a process written up. That's `/sop`.
- You want an idea stress-tested before building it. That's `/roast`.
- You want to know what's missing from your setup. That's `/audit`.

**The Core may offer `/escalate` once** when it's honestly out of depth. Once. If you say no, it drops it and doesn't ask again this session.

## Inputs to read

- `context/support.md` — who supports this install, and where the packet goes. **Required.** If it's missing, say so and offer to create it from the defaults rather than guessing an address.
- `references/voice.md` — voice match for the summary sections (if it exists yet)
- `context/about-business.md` — the business name for the subject line
- `.claude/skills/escalate/packet-template.md` — **clone this, do not re-derive the shape.** Fill every `{{TOKEN}}`, delete any section that has no content rather than leaving it empty.
- `references/privacy-sop.md` — read before Step 4. This skill moves your business data to a third party, which is exactly what that SOP governs.

## Process

### Step 0 — Mode

Classify from what you were given, in one line. Don't interrogate.

- **SUPPORT** — something is broken, misconfigured, or stuck. The goal is to get it working.
- **PROJECT** — the work is real and beyond what this kit does alone. The goal is to get it scoped.

State the call plainly: *"Reading this as SUPPORT — the Google auth is failing and we've exhausted the local fixes. Say the word if it's really a project."* Let them flip it. Move on.

### Step 1 — Harvest

Gather everything a stranger would need. Pull from six places:

**1. This session.** Summarize it from your own live context — you *are* the session, so you know what was tried and in what order. That beats parsing a transcript file and it avoids re-ingesting secrets that already scrolled past. Capture:
- what they set out to do
- every approach attempted, in order
- what each one did or didn't do
- where it stands right now

If something material happened before your context window and you genuinely can't recall it, say so in the packet under *what I couldn't recover*. Do not invent it.

**2. The project.**
- `CLAUDE.md` — the install's identity, priorities, cornerstone settings
- `context/*.md` — who they are, the business, priorities
- `decisions/log.md` — last 10 entries
- installed skills — list `.claude/skills/*/`
- `context/second-brain.md` if present (vault configured or not)

**3. Connections.** From `connections.md`, build a table of: system, mechanism, auth status, last checked. **Status only.** A row reads `Google Calendar | OAuth | authed, token refreshed 2026-07-20 | 2026-07-26`. It never contains a key, a token, a refresh token, or a password. Not truncated, not masked. Absent.

**4. The failure.** The exact command and its verbatim output. Error text matters more than your paraphrase of it, so quote it. Run it once more if you need a clean capture.

**5. Environment.**
- OS and version, node version, Claude Code version
- MCP servers configured, **by name and auth state only** (`n8n — configured, authed` / `firecrawl — configured, NOT authed`)
- Whether Doppler is in use (yes/no, and the project name — never a value)

**6. Git.** `git log -10 --oneline` and `git status --short`, so the other end knows what changed recently and what's uncommitted.

Do all of this quietly. Don't narrate each read.

### Step 2 — Confirm

One screen. This is the step that makes the packet worth sending:

```
Here's what I think you need help with:

  {one sentence, plain language}

What I'm sending:
  · {the failure, one line}
  · {what we tried, one line}
  · {project + connection state}

Going to: {name} at {email}, from context/support.md.

Have I got that right?
```

If they correct it, take the correction as the headline and keep going. If they add detail, fold it in. Never overrule what they say the problem is — they know their business, you know the logs.

### Step 3 — Their words

Ask this, close to verbatim:

> **"Is there anything else you want to ask Mike, or any notes you want to add?"**

Use the actual support contact's first name from `context/support.md`.

Whatever comes back goes into the packet **unedited**, in its own block, under their name. Do not clean it up, do not shorten it, do not translate it into the voice of the kit. If they say "nothing," write `(none)` and move on. Don't ask twice.

### Step 4 — Redact, then show them the inventory

**Redaction runs before they see anything.** Sweep every harvested string for:

- `sk-`, `pk_`, `rk_`, `ghp_`, `gho_`, `github_pat_`, `xox[baprs]-`, `AKIA`, `AIza`, `dop_v1_` prefixes
- `Bearer ` followed by a long token
- `-----BEGIN [A-Z ]*PRIVATE KEY-----` blocks
- any `password`, `passwd`, `secret`, `token`, `api_key`, `apikey`, `client_secret`, `refresh_token` assignment
- anything that looks like a resolved Doppler value or the contents of a `.env`
- long random-looking strings (20+ chars of mixed case + digits) in a credential-shaped context

Replace each with `[REDACTED: {what it was}]` and log the swap. **If you are unsure whether something is a secret, redact it.** A missing detail costs one email. A leaked key costs a lot more.

**Then tell the operator what you found.** If a live credential was sitting somewhere it shouldn't be ... a git-tracked file, a plaintext note, a password in `connections.md` ... that's a security problem in their install whether or not this escalation ever gets sent. Say so plainly, name the file, and tell them to rotate it. Redacting it from the packet fixed the packet, not the repo. Put the same note in the packet's redaction section so the person on the other end knows to follow up.

Then print the data inventory:

```
Leaving this machine:

  Session summary          what you were doing + what we tried
  Error output             the verbatim Google auth failure
  Project context          CLAUDE.md, context/, last 10 decisions
  Connections table        7 systems, status only, zero credentials
  Environment              Windows 11, node 22, 3 MCP servers by name
  Your note                the 2 lines you just wrote

  Redacted: 1 API key from the error output.

  Strike anything you don't want sent. Otherwise say "send it."
```

Wait for an explicit go. Not "ok cool" in the middle of another sentence — a real yes. If they strike a line, remove it and reprint the inventory.

### Step 5 — Write the packet

Clone `packet-template.md`. Write to `escalations/YYYY-MM-DD-{slug}.md` where `{slug}` is 2-4 kebab words from the problem (`google-auth-failing`, `calendar-sync-broken`).

If that file already exists, append `-2`. Never overwrite a previous escalation.

Create `escalations/` if it isn't there.

### Step 6 — Deliver

Subject line, fixed, short, **plain ASCII only** (no em dash, no smart quotes, no curly apostrophes — raw non-ASCII mojibakes in mail headers):

```
[ESCALATION] {Business Name}: {3-5 word summary}
```

Example: `[ESCALATION] Grape Creek Winery: calendar sync broken`

Email body is six lines, no more:

```
{Mode}: {one-line ask}

What happened: {one line}
What we tried: {one line}
Where it stands: {one line}

Full packet attached: {filename}. It's written to be uploaded straight into your AI.
{Sender name}
```

Then deliver, first path that works:

1. **Mail is wired** (Gmail MCP or equivalent in `connections.md`) → create a **draft** in their own account, addressed to the support contact. A draft, never a send. Replies thread back to them naturally. Tell them the draft is waiting and they need to attach the packet file.
2. **No mail wired** → copy the full packet to the clipboard (`clip` on Windows, `pbcopy` on macOS, `xclip -selection clipboard` on Linux), then open a prefilled `mailto:` with the OS handler (`start` on Windows, `open` on macOS, `xdg-open` on Linux). Tell them the packet is on the clipboard, ready to paste.
3. **Always, regardless** → print the absolute file path and say they can attach or forward it themselves. This path never fails, so the skill never dead-ends.

Close with the file path, who it went to, and what happens next. Three lines.

## Output

- `escalations/YYYY-MM-DD-{slug}.md` — the packet
- A mail draft, or a prefilled `mailto:` plus the packet on the clipboard
- A three-line closing screen: file path, recipient, next step

Nothing else is written. The skill does not touch `decisions/log.md`, `context/`, or anything else in the repo.

## Hard rules

1. **Nothing leaves this machine without an explicit yes.** Not the file (that's local, fine), but no draft, no clipboard, no mail window until Step 4 gets a real go-ahead.
2. **No credentials. Ever. In any form.** Not masked, not truncated, not "the first four characters." Connections carry *status*, never secrets. When in doubt, redact.
3. **Never manufacture an escalation.** This skill exists to help the operator, not to generate leads for whoever supports the install. If the honest answer is "here's the fix," give the fix. PROJECT mode is only for work genuinely beyond this kit. Offer once when out of depth, then stop.
4. **The operator's note goes in verbatim.** Don't polish it, don't summarize it, don't rewrite it in the kit's voice.
5. **Never fabricate.** If you can't recover part of the session, say so in the packet. A gap that's labeled is useful. A gap that's filled in with a guess is worse than nothing.
6. **Read-only on the whole repo except `escalations/`.**
7. **Disclose plainly** that a human reads this, and name them. No vague "our support team."

## Bike Method posture

- **Phase 1 — Training wheels (current).** The operator confirms the ask, adds their note, reviews the data inventory, and hits send themselves. Every time.
- **Phase 2 — Guided.** The inventory becomes a skim-and-approve instead of a line-by-line. Still no auto-send.
- **Phase 3+ — Not appropriate.** A skill that moves business data off the machine keeps a human in the loop permanently. This one does not autonomize.

Phase advances only by explicit edit to `bike-method-phase:` in this file's frontmatter.

## Cornerstones

- **Security** — this packet is the highest-risk artifact this kit produces: a full project dump in one file. Redaction runs before any preview. Credentials never appear in any form. The transport is the operator's own mail account, so no shared secret ships with the kit and there's no endpoint to attack.
- **Privacy** — this moves business data to a third party. The Step 4 inventory makes that explicit and editable, and the send is the consent. Minimize PII: customer names, emails, and addresses stay out unless they *are* the problem. The packet stays in the operator's own repo as their record.
- **Ethics** — a named human reads it, and they're named. The skill never invents a reason to escalate, and never upsells a project when a fix is the honest answer.

---

> *A freshstarts.io deliverable. Security, ethics, privacy — surfaced by design, not bolted on.*
