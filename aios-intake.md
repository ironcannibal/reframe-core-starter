# Reframe Core Intake

This is the source-of-truth file for your Reframe Core. Fill it in by typing, voice-pasting (dictation), or running `/onboard` for a guided conversation. Whichever mode, this file is what `/onboard` reads to scaffold your Day-1 setup.

**Hard cap: 7 questions.** Each answerable in under 60 seconds. Don't overthink ... you can edit and re-run `/onboard` any time.

---

## Setup (before the 7 questions)

**What do you want to call this install?** Your name, your business's name, or just leave it as Reframe Core. This is what your operating manual will call itself.

```
install_name: Reframe Core
```

**The three cornerstones ship ON by default** — Security, Ethics, Privacy. Every build decision is checked against them at design time, and anything that could clash gets flagged to you immediately during setup. This is your install, so you can override any of them... start by keeping all three.

```
cornerstones: keep all (Security, Ethics, Privacy)
```

---

## Q1 — Who are you, what do you sell, who do you sell it to?

Identity, offer, ICP. One paragraph each is fine.

```
Identity:

Offer:

ICP (who you sell to):
```

---

## Q2 — Paste 1-2 things you've written recently. Don't edit them.

An email, a post, a DM, a doc ... anything that sounds like you when you're not trying. **Paste verbatim.** Do not type these mid-conversation with Claude ... chat-shaped samples are worse than no samples (voice contamination).

```
Sample 1:


Sample 2:

```

---

## Q3 — What are your 2-3 biggest priorities for the next 90 days?

Quarterly priorities. Not yearly aspirations. Things that, if not done, would make you say "I wasted the quarter."

```
Anchor goal:

Sub-priorities:
1.
2.
3.
```

---

## Q4 — Where does revenue actually land, and where is it tracked?

Multiple answers OK. Stripe? Skool? GoHighLevel? QuickBooks? A spreadsheet?

```
Where revenue lands:

Where it's tracked:
```

---

## Q5 — Where do you talk to customers, your team, and the outside world day-to-day?

Email (which one — Gmail / Outlook)? Slack? Teams? DMs (Skool / Discord / iMessage)? Phone?

```
Email:

Customer / team chat:

Phone / text:

Social:
```

---

## Q6 — Where do meeting recordings, notes, and important docs live?

Granola? Otter? Fireflies? Google Drive? Notion? Dropbox? A folder on your desktop you keep meaning to organize?

```
Meeting recordings:

Docs / files:

Notes:
```

---

## Q7 — What's the one task that eats your week, and where do you currently track work?

The single biggest time-suck or recurring drudgery. Plus where tasks/projects live (ClickUp / Asana / Linear / Notion / a notebook).

```
Top time-suck:

Work tracking (current state):
```

---

When this file is filled, run `/onboard` (or re-run it) and the wizard will scaffold your Day-1 file set: `context/`, `references/voice.md`, populated `connections.md`, and a filled `CLAUDE.md`.

**Optional, after onboarding:** run `/second-brain` if you want a long-term knowledge vault (session history + durable facts that compound instead of resetting each chat). It explains the idea, compares the options, and installs one only if you want it. Not a question here — it's a separate, no-pressure step. The kit works fully without it.
