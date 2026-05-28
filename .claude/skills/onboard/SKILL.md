---
name: onboard
description: Use on Day 1 of a Reframe Core install, when someone says "set me up", "onboard me", "let's get started", "fill in my Reframe Core", or has just cloned the kit. Combined wizard — runs the 7-question intake AND scaffolds the Day-1 file set at the end. Idempotent — re-run any time after editing aios-intake.md.
---

## What this skill does

Single combined wizard. Opens by naming the install and setting the three cornerstones (Security / Ethics / Privacy) as opt-out defaults (Step 0), reads or writes `aios-intake.md` (the canonical intake), conducts the 7-question interview if the file isn't filled, then scaffolds the Day-1 file set inline at the end of the run. No separate `/scaffold-from-intake` skill — this is one flow.

**The wow moment:** at the end, suggest the closing prompt *"Try this — ask me: what should I focus on this week?"* The user runs it once. That's the wow. There's no `/today` skill to save — the prompt itself plants the Mindset framework (Default Shift) for them to internalize.

## When NOT to run this

- If the user has already onboarded and wants to refresh: still run, but skip questions already answered (idempotent).
- If the user wants to add a new connection: that's not onboarding — point them at `connections.md` to edit directly, or schedule a `/level-up` Phase 2 walk.

## Execution

### Step 0: Name it + lock the three cornerstones (run this FIRST, before the interview)

Two openers, stated plainly before any questions — they frame the whole install.

**A. Name the install.** Ask:
> *"First — what would you like to call your Reframe Core? Your own name, your business's name, or just leave it as **Reframe Core**. It's what I'll call myself in your operating manual."*

Default to `Reframe Core` if they don't care. Record as `install_name` in the Setup block at the top of `aios-intake.md`, and use it everywhere the manual names the system — the `CLAUDE.md` title and all "your {install_name}" phrasing.

**B. The three cornerstones — ON by default.** State them, don't bury them:
> *"This install ships with three cornerstones turned ON. Every build decision gets checked against them at design time, not bolted on after:*
> *1. **Security** — secrets handling, attack surface, failure modes.*
> *2. **Ethics** — fairness, honesty, who could be harmed. See `references/ai-ethics-sop.md`.*
> *3. **Privacy** — data inventory, consent, retention, subject rights. See `references/privacy-sop.md`.*
> *This is your install, so you can override any of them. Keep all three as your defaults, or change any now?"*

Record the answer in the Setup block as `cornerstones: keep all` (default) or list which were overridden and why. Whatever they pick, the generated `CLAUDE.md` carries a **Three cornerstones** section reflecting it.

**Clash-flagging is live for the WHOLE install — not just here.** Any answer or proposed connection that could collide with a kept cornerstone — wiring a tool that holds customer PII (Privacy), pasting a secret in plaintext (Security), an outreach tactic that sidesteps consent (Ethics) — STOP, name the cornerstone it touches, say it in plain language, and let the client decide: keep the guardrail or override it for their install. Flag it the moment it surfaces. Never proceed silently past a cornerstone clash.

### Step 1: Read the intake

Read `aios-intake.md`. Check which Q1-Q7 sections have content vs. `[Your answer here]` placeholders.

- **All filled** → skip Step 2, jump to Step 3 (scaffold).
- **Some filled** → ask the user: "I see Q1, Q3, Q4 are answered. Want to fill the rest now, or scaffold from what's there?" Their call.
- **None filled (fresh clone)** → run Step 2 conversationally.

### Step 2: The interview (7 questions, hard cap)

Ask one at a time. Write each answer into `aios-intake.md` as you go (so the user can resume if interrupted).

**Q1 — Who are you, what do you sell, who do you sell it to?**
Identity, offer, ICP. One paragraph each is fine.

**Q2 — Paste 1-2 things you've written recently. Don't edit them.**
*This is the only question with a hard rule.* Voice samples MUST be pasted, not typed mid-conversation. If the user starts typing fresh prose, refuse:

> *"Stop — paste it raw. If you type it here while we're talking, the sample is already shaped by our conversation. Open your last email or LinkedIn post in another tab and paste the unedited text. This is the one rule I can't bend."*

Ask for two samples. One email, one post. Or two of either.

**Q3 — What are your 2-3 biggest priorities for the next 90 days?**
Quarterly priorities. Push back if they say "grow my business" — make them name a number, a deadline, or a deliverable.

**Q4 — Where does revenue actually land, and where is it tracked?**
Multiple answers OK. Map to Tier-1 Domain 1 (Revenue/Financials).

**Q5 — Where do you talk to customers, your team, and the outside world day-to-day?**
Email (Gmail/Outlook), Slack/Teams/Discord, DMs. Map to Domains 2 + 4.

**Q6 — Where do meeting recordings, notes, and important docs live?**
Map to Domains 6 + 7.

**Q7 — What's the one task that eats your week, and where do you currently track work?**
Capture top_pain (used by `/level-up` Day-14) + Domain 5 (tasks).

Domain 3 (Calendar) is auto-inferred from Q5: Gmail → Google Cal; Outlook → Outlook Cal. Confirm in Step 3.

### Step 3: Scaffold the Day-1 file set

Once the intake is complete, generate these files (or update if re-running). Back up originals to `archives/intake-{YYYY-MM-DD-HHMM}/` if any exist.

1. **`context/about-me.md`** — from Q1 (identity, role) + Q7 (top_pain). One short paragraph each.
2. **`context/about-business.md`** — from Q1 (offer, ICP) + Q4 (revenue model). One paragraph.
3. **`context/priorities.md`** — from Q3. Numbered list, one line per priority.
4. **`references/voice.md`** — from Q2. Paste samples verbatim with a short header explaining their use ("Match this register when drafting; don't fake voice on external content without showing me first").
5. **`connections.md`** — populate the 7-row table from Q4-Q7 answers. Each row gets `mechanism: not yet connected`, `auth: —`, `last checked: —`. The user wires connections on Day 2.
6. **`CLAUDE.md`** — fill all `{{...}}` placeholders. Substitute the user's name, stated priority, voice register summary, and a brief connections summary. **Title and every self-reference use `install_name` from Step 0** (default `Reframe Core`). Include a **Three cornerstones** section (Security / Ethics / Privacy) reflecting the Step-0 choice: kept cornerstones are written as design-time defaults the client opted into ("every build decision passes through these three lenses at design time, not as an afterthought"); any overridden ones are noted as off by the client's explicit choice. Link the cornerstone SOPs (`references/ai-ethics-sop.md`, `references/privacy-sop.md`) when they ship in the install.

### Step 4: The closing screen

Print one screen. Three lines max:

```
✓ Day 1 done. Your {install_name} knows who you are, what you sell, what matters this quarter, and how you sound.

Today: ask me — "what should I focus on this week?"
Tomorrow: pick one tool from connections.md and wire it up (manual MCP install or write a small API script + save references/{tool}-api.md).
Day 7: run /audit to see your score.
```

When the user runs the closing prompt ("what should I focus on this week?"), respond using only the new context files. Hit:
- 3-bullet priority list, in their voice register from Q2
- Each bullet ties back to a stated 90-day priority from Q3
- Final line: *"If I had to pick one thing for Monday, it'd be [X], because [reason from priorities]. Want me to draft the first email? And — where could the Default Shift apply here? To what extent could AI be leveraged on this task?"*

The Default Shift question seeds the Mindset framework before `/level-up` formally introduces it on Day 14.

## Critical implementation rules

1. **The 7-question cap is non-negotiable.** Don't add Q8 in conversation.
2. **Voice paste cannot be skipped.** If the user types samples mid-chat, refuse and tell them to paste from real writing.
3. **One-shot scaffold.** After Step 2 ends, write Step 3 files in a single batch. No multi-turn confirmation. The user iterates by editing `aios-intake.md` and re-running.
4. **Idempotent.** Re-running with an edited intake refreshes context files; backs up originals to `archives/intake-{ts}/`. Skips questions already answered unless the user wants to revise.
5. **Closing screen is three lines.** Not a menu.
6. **No extra skills generated.** Don't scaffold `/today`, `/draft`, `/connect`, etc. The kit ships 3 skills; the user authors more via `/level-up`.
7. **Read-only on `references/3ms-framework.md`.** It already ships in the kit. Don't overwrite.
8. **No secrets on Day 1.** Don't ask for API keys during onboarding ... connections come Day 2. When keys do land, they go in Doppler, never in `.env`. See `references/doppler-secrets.md`.
9. **Step 0 runs first.** Name the install + set the cornerstones before the interview. Naming is NOT one of the 7 questions — it's setup framing, so it doesn't touch the 7-cap.
10. **Cornerstone clashes get flagged in real time** for the whole install, not batched at the end. Name the cornerstone, plain language, client decides keep-or-override. Never silent. The cornerstones start ON; the client owns the install and can turn any off.

## Verification (for the implementer)

- Cold-test: clone a fresh kit, run `/onboard`, fill 7 answers, scaffold runs, ask the wow prompt, response cites Q1 + Q3 + Q7 specifically. Generic = fail.
- Idempotency: re-run `/onboard` with one Q3 priority changed. Expected: only `context/priorities.md` and `CLAUDE.md`'s priority section update; backup created in `archives/intake-{ts}/`.
- Voice rejection: type a sample mid-chat. Expected: skill refuses, asks for paste.

> *Adapted from The Three Ms of AI™ © 2026 Nate Herk. The Mindset language used in the closing screen comes from `references/3ms-framework.md`.*
