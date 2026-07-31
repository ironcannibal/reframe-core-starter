# AI Ethics SOP

**Status:** Template | **Owner:** you | **Audience:** you + any contractors/hires | **Last updated:** YYYY-MM-DD

Companion to [security-sop.md](security-sop.md) and [privacy-sop.md](privacy-sop.md). Where those cover **the systems** and **the data**, this covers **how you use AI on it**. One specific attack class gets its own doc: [prompt-injection-sop.md](prompt-injection-sop.md).

> This is a starter template. The principles and checklist are ready to use as-is. The tables in sections 3 and 6 are blank ... fill them in as you ship AI-touching systems and approve vendors.

---

## 1. How to use this doc

This is the standing operating procedure for any AI-touching work in your business (model calls, voice agents, generated content, classifiers, enrichment, demos).

**When to consult it:**
- Before launching anything new that uses AI.
- When a customer or prospect asks "is this AI?" ... answers live in section 5.
- When adding a new AI vendor or a new data type to an existing AI workflow.
- When a contractor or hire starts ... they read sections 1-4 first.

**Day-to-day quick reference:** jump to the [decision checklist](#4-decision-checklist--before-you-ship) in section 4. If the checklist passes, you're probably fine. If it doesn't, fix it before shipping.

This is a guide, not a gate. You are the gatekeeper. The rules below are how to think about it.

---

## 2. Core principles

### 1. Disclose AI involvement when it changes how someone would react.
If a person could reasonably believe they're talking to a human, reading a human-written email, or getting a human-reviewed report ... and they're not ... disclose. Silence is fine when the AI involvement is obvious or immaterial (spam filter, autocomplete, search ranking).

### 2. Humans review AI output before it carries weight.
Money moves, legal claims, public statements, anything sent to a client by name ... a human looked at it. **AI suggests; humans ship.** Example: an AI-suggested action (a category, a draft, a journal entry) waits for a human confirm before it's saved or sent.

### 3. Send the AI provider the minimum data it needs.
Strip PII you don't need. Don't paste full client databases into prompts. If a field can be redacted or hashed without losing usefulness, do it. The smaller the data surface in the prompt, the smaller the blast radius if a vendor leaks, a prompt is logged, or context gets reused.

### 4. Never claim AI work is human work, or human work is AI-magic.
Don't sell AI-generated work as "hand-crafted by experts." Don't sell hand-crafted work as "AI-powered" to ride the hype. Be accurate about what the machine did and what you did ... in marketing copy and in client conversations.

### 5. Don't let AI make irreversible decisions about people without a path to appeal.
Lead scoring, automated rejection, content takedowns, account closures ... there has to be a way for a human to override and a person to ask why. Keep stakes low while they're low by building appeal paths in before stakes grow.

### 6. Vet AI vendors before sending them customer data.
Zero-retention or a DPA in place. No training on your customer data. Document the agreement in the [vendor approval list](#6-vendor-approval-list) below. If a vendor can't tell you what they do with your data, don't use them for sensitive work. Free tiers and consumer products (consumer ChatGPT, free Gemini, etc.) are never used for customer data.

### 7. Secrets never go in prompts. User input is never trusted.
API keys, passwords, internal URLs, server hostnames ... stay out of LLM context (keep them in Doppler ... see [doppler-secrets.md](doppler-secrets.md)). Anything coming from a user (call transcript, uploaded document, form field, web-scraped content) is potential prompt injection ... treat it as **data**, not **instructions**. See [prompt-injection-sop.md](prompt-injection-sop.md).

### 8. High-stakes AI decisions get logged.
What model, what prompt summary (not necessarily the full prompt ... see principle 3), what data the model saw, what it returned, what the human did with it. Enough to reconstruct the decision a year later if a client, regulator, or court asks.

---

## 3. Per-system quick reference

Fill one row per AI-touching system as it goes live.

| System | Disclosure rule | Human-in-loop | Data sensitivity | Vendor(s) | Key constraint |
|---|---|---|---|---|---|
| _{system name}_ | _{how/when you disclose}_ | _{who reviews, when}_ | _{public / PII / financial / privileged}_ | _{vendors}_ | _{the one rule that must hold}_ |

---

## 4. Decision checklist — before you ship

Copy-paste into PRDs and PR descriptions. Every item should resolve to a clear yes/no.

- [ ] **Disclosure:** If a person sees or hears this output and could think a human did it ... does the disclosure handle that?
- [ ] **Data flow:** What data leaves our servers and goes to which AI vendor? Is that vendor approved (section 6) for this data type?
- [ ] **Minimization:** Is the prompt sending only what's needed, or is it leaking extra fields out of laziness?
- [ ] **Human gate:** Is there a human review gate before this output reaches a third party? If not, is the consequence of an AI mistake low enough to skip it?
- [ ] **Failure mode:** What happens when the AI is wrong? Who notices, how, and who fixes it?
- [ ] **Secrets out:** Are credentials, internal URLs, and server hostnames absent from the prompt and the model's context?
- [ ] **Untrusted input:** If user-supplied or scraped input flows into the prompt ... is it sandboxed as data, not interpreted as instructions?
- [ ] **Appeal path:** If this is a decision about a person (score, classify, accept/reject, take down) ... is there a way to override and to find out why?
- [ ] **Logging:** Are we logging enough to reconstruct what happened in 12 months ... model, input summary, output, human action?
- [ ] **Honest answer:** If a customer asks "did AI write this / is this AI?" ... do I have an honest, plain-language answer ready?
- [ ] **Owner-in-loop:** Have I flagged anything that adds a new data type, new vendor, or new public surface to the owner before launching?

If any item is "no" and you don't have a written reason why "no" is okay ... pause and fix before shipping.

---

## 5. Copy-paste disclosure snippets

Plain language. Drop in as-is, or adapt to product voice. Replace `{business}` / `{product}`.

**Voice-agent greeting**
> "Hi, my name is {name}, an AI assistant for {business}. How can I help?"

**Email footer — AI-drafted send**
> "This email was drafted with AI assistance and reviewed before sending. Reply STOP to opt out."

**Report header — AI-generated sections**
> "Sections of this report were generated by AI from automated scans. Findings should be verified by a human before acting on them."

**AI answer prefix (document Q&A)**
> "AI-generated answer based on the documents you uploaded. Every claim links to its source ... verify before relying on it."

**Suggestion UI**
> "AI suggested this. Confirm or change before saving."

**Content footer (AI-heavy post)**
> "Drafted with AI assistance, edited by a human."

**Customer asks "is this AI?" — template**
> "Yes ... {what AI does in this product, plainly}. A human reviews {what gets reviewed} before {what gets shipped to you}. Happy to walk through specifics if useful."

---

## 6. Vendor approval list

| Vendor | Approved data types | Contractual basis | Approved by | Date |
|---|---|---|---|---|
| _{vendor}_ | _{e.g. lead PII, content}_ | _{zero-retention tier / DPA / standard API ToS}_ | _{you}_ | _{YYYY-MM-DD}_ |

**Rule:** New vendor = no sensitive data until a row exists here. Free tiers and consumer products are not on this list and not used for customer data.

---

## 7. New-system launch protocol

When a new AI-touching system enters the picture (new product, new workflow, new feature):

1. **Fill out the decision checklist** (section 4) inside the PRD, before building.
2. **Pick the disclosure snippet** from section 5 ... or write a new one and add it to section 5 in the same change.
3. **Add a row** to the per-system reference table (section 3) when the system goes live.

If any of these three steps gets skipped, the launch isn't done.

---

## 8. Contractor / hire onboarding

**Read first:** this SOP (sections 1-4), plus the project's `CLAUDE.md`.

**You can ship without asking:** typo fixes, copy edits, layout tweaks that don't change disclosure language; internal tools that don't see customer data; anything that fits an existing approved pattern.

**You must check with the owner before shipping:** a new public-facing surface; a new AI vendor not in section 6; a new data type going to an existing vendor; anything that changes disclosure language or removes a human review gate.

**If a customer complains about AI use:** don't argue or deny; capture exactly what they're upset about and forward to the owner same-day; honor any opt-out immediately; the owner decides on response and any policy change.

---

## 9. Maintenance

**Review cadence:** quarterly, or whenever a new product launches, a new AI vendor is added, a customer complains about AI, or a relevant law changes.

**How to update:** edit this file directly, bump "Last updated", and note material principle changes in a change log at the bottom.
