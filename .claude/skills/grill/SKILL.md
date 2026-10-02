---
name: grill
description: Interviews you one question at a time on something you know you need but can't yet describe or spec, writing each answer down before the next question, then hands back a one-page spec you can build from. Use when you say "/grill <topic>", "grill me on X", "I know what I want but I can't explain it", "help me spec this", "ask me questions until X is clear". NOT for the Day-1 setup interview, that's /onboard, NOT for writing up a process you can already describe, that's /sop, NOT for pressure-testing an idea, that's /roast, and NOT for building the skill itself, that's /forge.
argument-hint: "[topic]"
bike-method-phase: 1
nateherk-attribution: |
  Inspired by Nate Herk's grill-me pattern in his AIS-OS kit. Original build, no ported code.
---

> *Inspired by Nate Herk's grill-me pattern in his AIS-OS kit. Original build, no ported code.*

## What this skill does

You know the problem. You can feel the thing you want. You just can't write it down as a spec, so it never gets built.

`/grill` fixes that by asking the questions for you. One question at a time, on one topic, until there's nothing left to ask or you say "wrap it." Every answer is written to a page before the next question goes out, so nothing lives only in the chat. At the end you get a one-page spec in plain words: what it is, who uses it, what goes in, what comes out, what "done" looks like, and what's still open.

That spec is ready to hand to `/forge` (build it as a skill), `/sop` (write it up as a process), `/level-up` (scope it as this week's automation), or `/escalate` (send it to whoever supports your install for a quote).

L2 autonomy: the AI runs the interview and writes the page. Nothing you said gets turned into a decision or copied anywhere else without your yes.

## When to invoke, and when NOT to

**Invoke** when:
- You say `/grill <topic>`, "grill me on X", or "help me spec this"
- You've described the same idea three different ways and it still isn't clear
- You want something built but don't know what to ask for

**Do NOT invoke** for:
- The Day-1 setup interview, that's `/onboard`
- A process you can already walk through start to finish, that's `/sop`
- An idea you've settled and want attacked, that's `/roast`
- Building the skill once the spec exists, that's `/forge`

## Inputs to read

- The topic you name (required). If you just say `/grill`, ask "What do you want to get clear on?" and nothing else.
- `context/about-me.md` and `context/about-business.md`, if they exist. They hold what's already known, so it doesn't get asked again.
- `decisions/log.md`. Search it for the topic. Logged decisions count as settled.
- `context/second-brain.md`, to pick where the page goes (Step 1).
- `references/privacy-sop.md`, `references/ai-ethics-sop.md`, `references/security-sop.md`, only when an answer touches their area (personal data, recordings, AI reading customer info, passwords, decisions about people). Skip them otherwise.

## Process

No scripts, no sub-agents, no spend. The only cost is your time, and you control it with "wrap it."

### Step 1: Pick where the page goes

Read `context/second-brain.md`.

- **It exists, `installed: true`, and `vault_automation: enabled`:** the page goes in the vault, at `{vault_path}/<Topic> - grill YYYY-MM-DD.md`. If the vault has a folder that clearly owns this topic, put it there.
- **Anything else (missing, not installed, or Drive/Notion):** the page goes at `references/specs/<topic-slug>-grill-YYYY-MM-DD.md`. Create `references/specs/` if it isn't there.
- **Same topic, same day, page already exists:** add a `## Session 2` block. Never overwrite the page.

Say the topic and the page path in one line, then go to Step 2. Don't ask permission to start.

### Step 2: Create the page before the first question

```markdown
---
type: interview
topic: <topic>
date: YYYY-MM-DD
status: dated interview notes, not settled fact until you confirm it
---

# <Topic> - grill YYYY-MM-DD

One question at a time. Each answer is written here before the next question.

**Already known going in (not asked again):** <filled in Step 3>

## Q&A

## The spec
```

### Step 3: Write down what's already known

Read the inputs above. Fill the **Already known going in** line with short facts already on record. Don't ask those again. If you bring one up yourself, record it like any other answer.

If two of your files disagree with each other, write a `⚠` line naming both, and make that the first question.

### Step 4: The question loop

One cycle: ask, you answer, write it down, then the next question. The write always happens before the next question.

**Asking**
- **One question per message.** It can name two or three parts of one thing ("how often, how long, who does it now"). Never two topics.
- Number them: Q1, Q2, Q3.
- **Start at the end result.** "When this is working, what's different about your week?" Then work back through the branches.
- **Cover the branches a spec needs.** Work through whichever of these apply, in whatever order the answers lead:
  1. The outcome: what's different when it works
  2. Who uses it, and who sees what it produces
  3. What starts it: a time, an event, a person asking
  4. What goes in: the information, where it lives today, who owns it
  5. What comes out: the exact thing, in what form, sent where
  6. How it's done today, by hand, step by step
  7. What "good enough" looks like, and what a mistake would cost
  8. What it must never do
  9. Tools you already pay for that it should use
- **Say what's left in every question message,** in one line: `3 branches left: inputs, mistakes, tools.` Re-count when a new branch opens.
- **Offer examples when an answer stalls.** If you say "I don't know," give two or three concrete options to react to ("Would it be a daily email, a list in a file, or a text?"). Picking from options is easier than describing from scratch. Record which one you picked and why.
- Keep the chat short. At most one line before each question. The detail goes on the page.

**Writing the answer**
- Append `**QN. <the question as asked>**`, then bullets.
- **Your words:** close to what you said. Direct quotes in quotes.
- **The AI's interpretation:** a separate bullet, `*Read:*`. Never mixed into your words.
- When you confirm a read, add `**Confirmed at QN.**` under it. An unconfirmed read stays a read and never goes into the spec as fact.
- If you dictate, fix obvious transcription slips. If the meaning is unclear, ask. Don't guess.

**Corrections**
- If you change an earlier answer, strike the old text with `~~...~~`, mark it `**Changed at QN, see below.**`, and write the new answer. Never delete the old one. The change is part of the record.

**Checks (only when an answer gives something concrete to check)**
- **Contradictions:** when an answer disagrees with `decisions/log.md` or your `context/` files, write `⚠ Contradicts <file> "<the line>"` and say so in the next message. Don't let it slide.
- **Math:** redo every number you give and show the arithmetic as `*Check:*`. If it's off, say so plainly.
- **Security, ethics, privacy:** when an answer touches one, read the matching SOP section and write `*Check:*` citing it. If there's a gap, raise it before the next question.

**Tangents:** a new topic gets one line under `**Parked:**` on the page. Don't chase it. It can be its own `/grill` later.

**Stop when** the branches are dry, or you say "wrap it" (or "that's enough", "done").

### Step 5: Write the spec

Fill `## The spec` from confirmed answers only. Keep it to one page:

```markdown
**What it is:** one sentence.
**Why it matters:** what changes when it works, in your words.
**Who uses it:** ...
**Starts when:** ...
**Takes in:** ... (and where that lives today)
**Hands back:** ... (form, and where it goes)
**Done looks like:** the test that proves it works.
**Must never:** ...
**Uses:** tools you already have.
**Still open:** anything not settled.
**Changed during the grill:** one line per answer you reversed.
**Next step:** the one skill to run next, and why (`/forge`, `/sop`, `/level-up`, or `/escalate`).
```

Show the spec in chat and ask: "Anything wrong or missing?" Fix what you flag, on the page.

### Step 6: Log decisions, with your yes

If you decided something during the grill (a yes, a no, a choice between options), list them and ask before writing. On your yes, append each to `decisions/log.md` in its existing format (date, title, Decision, Why, Alternatives considered, Owner).

Standing facts about you or the business that came up (a new tool, a changed price, a new person) get listed too. On your yes, update `context/about-me.md` or `context/about-business.md`. Adding a line needs only that yes. Replacing an existing line: show the exact old and new text first.

### Step 7: Report one screen

- The page path, the question count, and whether it ended dry or on "wrap it"
- Contradictions flagged, or "none"
- What was logged or updated, and what's waiting on your yes
- The spec's **Next step** line

## Output

- One interview page with the Q&A and the spec, in the vault or in `references/specs/`.
- Decisions appended to `decisions/log.md`, and `context/` updates, only after your yes.

## Rules

1. **One question per message.** Never two topics in one turn.
2. **Write the answer down before asking the next question.** The page is the record, not the chat. A long grill has to survive the chat being cleared.
3. **Never re-ask something already known or already answered.** Check the page before every question.
4. **The interview page is notes, not settled fact.** Only confirmed answers go into the spec.
5. **Never guess.** A contradiction gets flagged with `⚠`, not quietly resolved. Unclear means ask.
6. **Never delete a changed answer.** Strike it through and record the new one.
7. **Nothing leaves the page without your yes.** Decisions, `context/` edits, and anything sent through `/escalate` all wait for you.
8. **Plain words.** Short sentences, no jargon you didn't use first. If a technical term is needed, explain it in the same line.
9. **No scripts, no sub-agents, no bundled files.** The AI runs the interview directly.

## Bike Method posture

- **Phase 1, training wheels (current).** The page is written as you go. Every decision log entry and every `context/` edit waits for your yes. Read the page after each run and fix the skill where it drifted.
- **Phase 2, guided.** Appends to `decisions/log.md` for decisions you stated outright land without a separate yes and get reported. Edits to existing `context/` lines still wait. Move up only after several clean runs.

Phase advances only by editing `bike-method-phase:` in this frontmatter.
