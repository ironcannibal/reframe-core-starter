# Security SOP

**Status:** Template | **Owner:** you | **Audience:** you + any contractors/hires | **Last updated:** YYYY-MM-DD

Third of the three cornerstones. Companion to [ai-ethics-sop.md](ai-ethics-sop.md) and [privacy-sop.md](privacy-sop.md).

The division of labor between the four:

| Doc | Owns |
|---|---|
| **This doc** | Threat model, attack surface, secrets handling, failure modes, blast radius, access. The *how* behind "security by default." |
| [privacy-sop.md](privacy-sop.md) | The data itself. What you collect, why, how long, who sees it, what you owe the subject. Breach *notification* lives there. |
| [ai-ethics-sop.md](ai-ethics-sop.md) | How you use AI on data. Disclosure, human gates, vendor approval. |
| [prompt-injection-sop.md](prompt-injection-sop.md) | One specific attack class in depth: untrusted text reaching an LLM prompt. Trust tiers and the three gates. |

> This is a starter template. The principles, the client-access policy, and the checklist in section 8 are ready to use as-is. The tables in sections 3 and 5 are blank ... fill them in as you ship systems. Items marked `[SET YOUR DEFAULT]` are placeholders; pick a number that fits your business.

---

## 1. How to use this doc

**When to consult it:**
- Before shipping anything that takes input, exposes an endpoint, holds a credential, or runs unattended.
- Before accepting access to a client system. Section 7 is the policy and the script.
- When adding a new machine, a new vendor account, or a new scheduled job.
- When something breaks in a way you didn't expect. Section 5 is where failure modes get written down after the fact.
- Quarterly, as part of the access review.

**Day-to-day quick reference:** jump to the [decision checklist](#8-decision-checklist---before-you-ship) in section 8. If every box is yes, you're probably fine.

This is a guide, not a gate. You are the gatekeeper.

---

## 2. Core principles

### 1. Least access, applied to the machine and to yourself.

The Intern Rule ([3ms-framework.md](3ms-framework.md)) says give an AI only what a brand-new hire gets on day one. The same rule applies to *you* when you're the one working inside someone else's business. Take only the access the engagement actually requires and decline the rest, unprompted, before anyone asks you to.

Most people take every key they're handed. Not taking them is the sharpest available proof that the cornerstones are real, and it shrinks your breach surface to almost nothing.

A line worth saying out loud: *"If I don't need access to your internal stuff, I don't want it."*

### 2. Secrets live in Doppler. Nowhere else, ever.

Not in the repo. Not in a `.env` committed by accident. Not pasted into a prompt. Not in a log line, an error message, or a screenshot. Not in a chat message to a client. If a secret has been anywhere it shouldn't, it is burned. Rotate it, don't reason about whether anyone saw it.

Your AI never holds a key. Scripts run under `doppler run`, so the credential is injected into the process environment and never enters the model's context. See [doppler-secrets.md](doppler-secrets.md).

### 3. Design for the failure, not the happy path.

Every dependency will be down at some point. Decide in advance whether each one fails closed (stops, alerts) or fails open (degrades, continues), and write it down. An unlogged failure that silently continues is worse than a crash, because a crash gets noticed.

### 4. Know the blast radius before you build.

For every system: if an attacker fully owns this, what is the most damage possible? If the honest answer reaches a client's production environment, or lets someone send mail as you, that system needs a containment boundary before it ships, not after.

### 5. Trust is a property of the source, not the field type.

Anything that crosses the auth boundary is untrusted, regardless of how it's stored or what it looks like. Scraped pages, email bodies, call transcripts, uploaded files, filenames, form fields, third-party API responses. Classification and handling are in [prompt-injection-sop.md](prompt-injection-sop.md). `text not null` is not a defense.

### 6. Unattended means it needs a watchdog.

A scheduled job with no human present is a system that can fail silently for weeks, or loop, or spend money. Anything on a timer needs a success signal that a human would notice the absence of, plus a spend or rate ceiling if it can consume anything metered.

**The lesson that costs people the most:** *"it worked when I ran it manually"* is not evidence the scheduled job works. The wrapper and the invocation context are part of the system under test. Verify the scheduled run, not the hand run.

### 7. Every system gets an off switch, and someone besides you knows where it is.

If it can't be stopped in under five minutes by a person who didn't build it, it isn't finished. Same standard as the hand-off test, applied to shutting things down instead of running them.

### 8. Compartments hold. Cross-contamination is the failure, not the inconvenience.

Client work stays in its own credentials, its own vault, its own Doppler project. Personal stays separate from business. Compartments exist because merging them once is unrecoverable, and convenience is never a sufficient reason to breach one.

---

## 3. Attack surface inventory

The canonical list of what could be attacked. Add a row when a new surface ships. Review quarterly alongside the privacy data inventory.

| Surface | Exposure | Who can reach it | Worst case | Current controls |
|---|---|---|---|---|
| _{e.g. Secrets vault}_ | _{all API credentials}_ | _{you, per-machine tokens}_ | _{total credential compromise}_ | _{MFA, per-machine scoped tokens, never committed}_ |
| _{OAuth tokens}_ | _{which scopes}_ | _{any process with vault access}_ | _{what an attacker could do with them}_ | _{least-privilege scopes, named}_ |
| _{Scheduled jobs}_ | _{run unattended, what access}_ | _{local machine access}_ | _{silent failure, or a wrong automated action}_ | _{exit-code monitoring, alerting}_ |
| _{Public site / endpoints}_ | _{the open internet}_ | _{anyone}_ | _{defacement, redirected checkout, harvested form data}_ | _{MFA, hosted payment pages}_ |
| _{Client systems}_ | _{whatever an engagement grants}_ | _{you, and anyone who compromises you}_ | _{damage inside client production}_ | _{section 7 ... default is to decline}_ |
| _{Untrusted text into an LLM}_ | _{scrapes, transcripts, uploads, email}_ | _{anyone who can put text where you read it}_ | _{model steered into wrong output or action}_ | _{prompt-injection-sop.md, three gates}_ |

**Devices and portable media:** if your workspace travels (a laptop, an external drive), note explicitly whether credentials travel with it. They shouldn't. Auth belongs in the OS user profile, not on the drive.

---

## 4. Secrets handling

**The rule:** every credential lives in Doppler, is injected at runtime, and never appears in a file, a prompt, or a log.

| Situation | What to do |
|---|---|
| New API key | `doppler secrets set --project <tool> --config dev <NAME>`. Then write `references/{tool}-api.md` so the next person doesn't re-research it ... see [api-setup-template.md](api-setup-template.md). |
| Running a script | `doppler run --project <tool> --config dev -- node scripts/thing.mjs`. Never export the value to a shell first. |
| A key needs to reach a third party | It doesn't. Give them their own key, scoped to what they need. |
| A key was pasted somewhere it shouldn't be | Rotate immediately. Do not assess likelihood first. Then log it in `decisions/log.md`. |
| A contractor finishes a task | Revoke their access the same day. Access is per task, not per person. |
| A machine leaves service | Deprovision its token. Per-machine tokens stay with the profile, not the drive. |
| Before making a repo public | Scan the working tree **and the full git history** for secrets. History survives the visibility flip. |

**Rotation cadence `[SET YOUR DEFAULT]`:** annually, plus immediately on any of: suspected exposure, contractor offboarding, vendor breach disclosure, or a machine leaving service.

**Account credentials** (as opposed to API keys): unique password per vendor, MFA via authenticator app or hardware key, never SMS. Pick a credential manager and write down which one.

**Never in a prompt:** API keys, passwords, internal URLs, server hostnames, client credentials.

---

## 5. Failure modes and blast radius

Write these down per system when you build it, then update them here when reality disagrees with the plan.

**The two questions, for every dependency:**
1. What happens when it's down?
2. Does this system fail closed (stop and alert) or fail open (degrade and continue)?

**Fail closed** when the consequence of continuing on bad or missing data is worse than the consequence of stopping. Anything that moves money, sends outbound to a client, or writes to a client system.

**Fail open** when a partial result still has value and its absence would be noticed anyway. A daily digest is the model: each section degrades to a note on failure, so one dead source never kills the whole thing.

| System | Failure mode | Behavior today | Adequate? |
|---|---|---|---|
| _{system}_ | _{what breaks}_ | _{what happens now}_ | _{yes / no ... and what's missing}_ |

**Blast radius, ranked.** Write your own version of this list. The point is to know, before an incident, which compromise is the one that ends you:
- **Secrets vault compromised** = everything. This is usually the single point of failure. MFA and per-machine tokens are the whole defense.
- **Mail/identity token compromised** = messages sent as you. Reputation damage is the least recoverable kind.
- **Source control compromised** = disclosure, not destruction, *provided* nothing sensitive was ever committed.
- **One vendor key compromised** = that vendor's scope only. Flag the ones that can *spend* ... they need a ceiling.

**On spend caps:** check whether your vendor's "usage trigger" actually halts service or merely notifies. Many only notify. If it only notifies, you have detection, not prevention ... say so out loud rather than believing you have a cap.

---

## 6. Threat model

**Who realistically wants in, in rough order of likelihood:**

1. **Opportunistic automation.** Credential stuffing, leaked-key scanners crawling public repos, commodity phishing. Highest likelihood by far, lowest sophistication. Defended by MFA everywhere, no secrets in the repo, unique passwords.
2. **Prompt injection through content you ingest.** Anyone who can put text on a page you scrape or in an email you read. The attacker needs no access at all. See [prompt-injection-sop.md](prompt-injection-sop.md).
3. **Physical loss.** A drive or a machine. Mitigated by credentials not traveling with the hardware.
4. **A client-side compromise reaching you,** or yours reaching them. Mitigated primarily by not holding client access in the first place (section 7).
5. **A targeted attack on you specifically.** Low likelihood early. It rises with public profile ... and growth raises your profile deliberately.

**What an attacker gets, ordered by what would actually hurt:**
1. The ability to send as you. Reputation and client trust, unrecoverable.
2. Client data or client system access. Contractual and legal exposure, plus the end of the relationship.
3. Credentials that spend money.
4. Internal positioning and process docs. Embarrassing, not fatal.

**Write down what's out of scope,** and revisit it when the client base changes shape. For most small operations that's nation-state adversaries, deep supply-chain attacks beyond ordinary version pinning, and physical intrusion.

---

## 7. Client access - the minimum-access policy

**The default is to decline.** When a client offers logins, the answer is no unless the work genuinely cannot be done without them.

This is policy, not preference, and it should be backed by machinery rather than a promise: keys live in Doppler, so even your AI never holds them.

**When access is genuinely required:**

- [ ] Take the narrowest role available. Viewer over editor, editor over admin, single-property over account-wide.
- [ ] Own credential, never a shared login. Never the client's personal password.
- [ ] Time-bound where the platform supports it, with a calendar reminder to revoke.
- [ ] Written down: what was granted, by whom, when, and the revocation date.
- [ ] Revoked the day the engagement ends, and confirmed revoked, not assumed.
- [ ] MFA on the account that holds it.

**Never accept:** a client's personal password, a shared team login, root or owner on anything, or access to a system unrelated to the engagement "since you're in there anyway."

**Say it out loud on the call.** It sells better than it costs, and it's the cheapest live demonstration of the cornerstones available.

---

## 8. Decision checklist - before you ship

Copy-paste into every PRD or PR description. Each item resolves to a clear yes/no. See also the ethics ([ai-ethics-sop.md](ai-ethics-sop.md) section 4) and privacy ([privacy-sop.md](privacy-sop.md) section 10) checklists. The three together are the cornerstones.

- [ ] **Threat model:** who would want to break this, what do they get, and is that worth defending against?
- [ ] **Attack surface:** every input, endpoint, webhook, public URL, and scheduled job this creates is listed.
- [ ] **Secrets handling:** credentials in Doppler, never in the repo, never in a prompt, never in a log line.
- [ ] **Least access:** this holds the minimum scopes and permissions that work, not the convenient ones, and each one has a stated reason.
- [ ] **Untrusted input:** anything from outside the auth boundary is treated as untrusted and passes the three gates (`prompt-injection-sop.md`).
- [ ] **Failure modes:** what breaks when each dependency is down, and does it fail closed or fail open?
- [ ] **Blast radius:** if this is fully compromised, what is the most damage possible, and what stops it spreading further?
- [ ] **Unattended execution:** if it runs on a schedule, what surfaces a silent failure, and what caps a runaway loop or spend?
- [ ] **Detection:** would you know? What is the signal, where does it land, and who reads it?
- [ ] **Rollback:** can someone who didn't build this turn it off in under five minutes, and do they know how?
- [ ] **Client access:** does this need a client credential? If yes, is it the least that works, time-bound, and revocable (section 7)?

If any item is "no" and you don't have a written reason why "no" is okay, pause and fix it before shipping.

---

## 9. Incident response

**Personal data involved?** Go to [privacy-sop.md](privacy-sop.md), the breach-response section. That's the canonical procedure, including notification windows. Don't duplicate it here.

**No personal data involved** (a leaked API key, a compromised vendor account, a defaced page, a runaway job):

**Within 1 hour:**
1. Contain. Rotate the credential, revoke the token at the vendor, kill the session, disable the scheduled job, take the surface offline.
2. Assume compromise is broader than it looks. Rotate adjacent keys in the same project.

**Within 24 hours:**
3. Scope it. What did the credential reach, and for how long? Pull vendor access logs before they age out.
4. Confirm the containment actually held. Verify the old key fails.
5. Open an incident entry in `decisions/log.md`.

**After:**
6. Root cause, in writing. Not "the key leaked" but how it got where it got.
7. One specific corrective action, with an owner and a date.
8. Update this SOP if the incident found a structural gap. Add the failure mode to section 5.

**Client-side incident:** if a client's system is compromised while you hold access, tell them the same day, in writing, before doing anything else. Then rotate your own credential regardless of whether it was implicated.

---

## 10. Verification

**Quarterly, alongside the privacy access review:**
- [ ] Secrets vault: list every project and config. Anything unused gets deleted, not left dormant.
- [ ] Every vendor account: MFA on, no SMS second factor, unique password.
- [ ] Re-check CLI auth and scopes (`gh auth status`, `doppler me`, and equivalents). Confirm they're still the minimum.
- [ ] **AI runtime device authorizations.** Claude Code tokens (claude.ai → Settings → Claude Code) or the Codex/ChatGPT equivalent ... one per signed-in device. Revoke every device no longer in service. They accumulate silently and never expire on their own.
- [ ] Connected apps and MCP servers: anything connected that isn't in [connections.md](../connections.md), and anything in `connections.md` that's no longer used.
- [ ] Scheduled jobs: confirm each one's last run exited clean.
- [ ] Client access still held: is every one of them still needed? Revoke the rest.
- [ ] Repo scan for committed secrets before any push to a public repo, history included.

**Per new AI workflow:** run the red-team strings in [prompt-injection-sop.md](prompt-injection-sop.md).

**Annually:** walk a hypothetical breach end to end on paper, same as the privacy SOP's dry run. Do both in one sitting.

---

## 11. Maintenance

**Review cadence:** quarterly, plus any of these triggers:
- New machine, new vendor account, or new scheduled job.
- New client engagement that involves any access at all.
- Any incident or near miss.
- A public-profile step change (site relaunch, first press, a large client).
- Vendor breach disclosure affecting anything in section 3.

**How to update:** edit this file directly, bump "Last updated," and note material changes in the change log below. One canonical phrasing per rule ... if the section 8 checklist changes, update every place that quotes it in the same pass.

**Change log:**
- YYYY-MM-DD ... adopted from the starter template.

---

## 12. Your open gaps

The SOP being active doesn't mean the stack is clean. Track the gaps it surfaced here, so they're visible instead of forgotten. A short honest list beats a long aspirational one.

| Gap | Why it matters | Owner | Status |
|---|---|---|---|
| _{e.g. no alerting on scheduled-job failure}_ | _{silent failure for weeks}_ | _{you}_ | _{open}_ |
