# Privacy SOP

**Status:** Template | **Owner:** you | **Audience:** you + any contractors/hires | **Last updated:** YYYY-MM-DD

Companion to [ai-ethics-sop.md](ai-ethics-sop.md) and [prompt-injection-sop.md](prompt-injection-sop.md). Where those cover **how you use AI on data**, this covers **the data itself** ... what you collect, why, where it lives, how long, who sees it, and what you owe the person it's about.

> Items marked `[SET YOUR DEFAULT]` are placeholders. Pick a number that fits your business and obligations (entering an EU/CA market may force sharper ones ... e.g., a 72-hour breach-notification window).

---

## 1. How to use this doc

**When to consult it:**
- Before any new system touches customer, prospect, lead, or employee data.
- When a customer asks "what do you have on me?" or "delete my data."
- When picking a new vendor that will store personal data.
- When designing a form, signup flow, intake call, or scraped-lead pipeline.
- When a system is being parked or decommissioned (don't forget the data sitting in it).
- Quarterly, as part of data-inventory review.

**Public-facing material:** sections marked **🌐 derived** are the source of truth for your public privacy notice. Keep them in sync ... when this doc changes, push the site update the same week.

---

## 2. Core principles

1. **Minimum data** ... collect only what the workflow needs *now*. Fields you don't have can't leak, can't be subpoenaed, can't haunt a future breach.
2. **Purpose limitation** ... data collected for X isn't repurposed for Y without a fresh basis.
3. **Lawful basis** ... every collection has one of three: consent, contract, or legitimate interest. Document legitimate-interest cases in section 5.
4. **Subject rights** ... anyone can ask what you have, get a copy, or have it deleted (regardless of jurisdiction). Section 5.
5. **Security by default** ... see the security cornerstone in `CLAUDE.md`. Encryption at rest and in transit, secrets in Doppler not in code, MFA on all data-bearing accounts.
6. **Vendor-as-extension** ... when a vendor holds your data, their privacy is your privacy. Every storage/processing vendor appears in section 7 with a DPA or equivalent. Free consumer tiers never see customer data.
7. **Deletion-as-default** ... every data class has a retention period and an automated end. "Keep it forever just in case" is the wrong default.
8. **Decommissioning is part of the lifecycle** ... when a product is parked, its data doesn't get to coast. Delete, archive offline, or scrub PII and keep as a demo. Section 9.

---

## 3. Data inventory

The canonical list of what you hold. Add a row any time a new collection point ships; review quarterly.

| Class | Examples | Source | Storage location | Retention | Lawful basis | Sensitivity |
|---|---|---|---|---|---|---|
| _{e.g. Lead / prospect contact}_ | _{name, email, phone}_ | _{form / intake call / research}_ | _{where it lives}_ | _{[SET YOUR DEFAULT]}_ | _{consent / contract / legit. interest}_ | _{low / med / high}_ |

**Out of scope (not collected today):** list anything you deliberately don't collect (demographic/inferred profiles, non-essential cookies, health/government-ID data), so future-you re-checks before starting.

---

## 4. Consent + lawful basis

| Collection point | Mechanism | Logged where? | Required language |
|---|---|---|---|
| _{e.g. Newsletter signup}_ | _{single opt-in checkbox, separate from submit}_ | _{subscriber record}_ | _{"I agree to receive updates from {business}. Unsubscribe anytime."}_ |
| _{Recording for AI processing}_ | _{explicit ... verbal confirm at call start or checkbox}_ | _{recording metadata}_ | _{"I'm going to use AI to summarize this ... is that OK?"}_ |

**Rules:** opt-in is a positive action (never pre-checked, never bundled); recording consent and AI-processing consent are separate from "I want to do business with you"; when uncertain about basis, default to asking.

---

## 5. Subject rights — when someone asks

Anyone (customer, prospect, scraped lead, subscriber, former client) can make these requests:

| Request | What you do | Target turnaround |
|---|---|---|
| **Access** ("what do you have on me?") | Pull every row across the inventory, export to PDF/CSV, send via secure channel | _[SET YOUR DEFAULT: e.g. 30 days]_ |
| **Export** ("send me a copy") | Same, machine-readable preferred | _[SET YOUR DEFAULT]_ |
| **Correction** ("this is wrong") | Update the record, log the change with date + requester | _[SET YOUR DEFAULT: e.g. 14 days]_ |
| **Deletion** ("delete me") | Delete from active systems; flag in suppression list so you don't re-ingest | _[SET YOUR DEFAULT]_ |
| **Withdrawal of consent** ("stop emailing me") | Honor immediately; backstop with suppression list | Same business day |
| **Objection to AI processing** | Stop AI processing on that subject's records; flag exempt | _[SET YOUR DEFAULT]_ |

**Suppression list:** when someone is deleted, a hashed identifier goes into a suppression list to prevent re-ingest from a future scrape/import. The suppression list is the *only* lawful exception to "honor deletion fully."

**Workflow:** funnel all requests to a dedicated mailbox (e.g. `privacy@{yourdomain}`). Log each request with date received, date completed, what was done.

---

## 6. Internal access — least privilege

| Role | What they see |
|---|---|
| **Owner** | Everything. |
| **Contractor — content/marketing** | Public-facing drafts, anonymized analytics. No raw lead data, no client records. |
| **Contractor — technical/build** | Only what the task requires; provisioned per task, revoked at task end. No standing access to production data. |

**Rules:** access per task not per person; no shared logins; quarterly access review; vendor accounts use unique passwords + MFA (authenticator/hardware key, never SMS).

---

## 7. Third-party data flows + vendor approval

Each vendor that processes personal data appears here with the data class, agreement basis, and approval date.

| Vendor | Data class | Mechanism | Agreement | Approved | Date |
|---|---|---|---|---|---|
| _{vendor}_ | _{data class}_ | _{OAuth / API / hosted}_ | _{ToS / DPA}_ | _{you}_ | _{YYYY-MM-DD}_ |

**Rule:** new vendor handling personal data = no personal data flows until a row exists here. Free consumer tiers never see customer data.

---

## 8. Retention & deletion

Each data class (section 3) gets a retention period and a mechanism for honoring it (a quarterly review query + delete script, a calendar reminder, a vendor TTL setting, etc.). **No "indefinite retention"** ... anything longer than your longest default gets a written reason here.

---

## 9. Decommissioning — parked products

When a product or workflow is parked, its data is still your obligation. Per parked system, pick one of three paths and log the decision in `decisions/log.md`:

1. **Delete the data, keep the code.** Fastest. Use when it won't be touched again and the data has no other purpose.
2. **Scrub PII, keep as demo.** Replace real names/emails/numbers with fabricated equivalents. Use for case-study or sales demos.
3. **Archive offline, keep code dormant.** Export to encrypted local storage, drop the database, keep the codebase. Use when resurrection is possible.

Verify what's actually in the database before flipping anything to option 2 or 3 ... a short DB peek per system is the check.

---

## 10. Decision checklist — before you ship

Copy-paste into every PRD or PR description.

- [ ] **Collection necessity:** every field on every form / API / scrape is justified by a current workflow.
- [ ] **Lawful basis:** which one (consent / contract / legitimate interest), and is it documented?
- [ ] **Consent UI:** if consent-based, is the opt-in a positive action, single-purpose, unbundled?
- [ ] **Inventory:** is this collection point listed in section 3?
- [ ] **Retention:** does this data have a retention period and an automated end?
- [ ] **Subject rights wiring:** can a deletion request actually reach and remove this data?
- [ ] **Vendor row:** does every vendor in the data path appear in section 7?
- [ ] **Access scope:** who internally can read this? Is that the smallest reasonable set?
- [ ] **AI processing flag:** if AI touches this data, is AI-processing consent separately captured (and the ethics-SOP checklist applied)?
- [ ] **Decommissioning path:** if the system stops being used, what happens to the data?
- [ ] **Public notice sync:** does your published privacy notice still accurately describe this?

---

## 11. Breach response

A breach is any unauthorized access, disclosure, alteration, or loss of personal data ... *or any credible reason to believe one occurred*. Don't wait for certainty.

**Within 1 hour of suspicion:** containment first ... revoke credentials, rotate keys (Doppler), kill sessions, block the vector. Page the owner immediately.

**Within 24 hours:** determine scope (what data, how many records, which individuals); capture a forensic snapshot (logs, access records, timestamps ... don't overwrite); open a private incident doc.

**Within 72 hours `[SET YOUR DEFAULT — matches GDPR; confirm for your jurisdiction]`:** notify affected individuals if data was likely accessed (plain language: what happened, what data, what to do, how to reach you); notify regulators if your jurisdiction requires.

**Post-incident:** root-cause write-up, a specific corrective action with owner + deadline, and an SOP update if a structural gap was found. Dry-run a hypothetical breach once a year.

---

## 12. Public privacy notice — derived sections 🌐

Source of truth for your public `/privacy` page. Render these four in plain language: **what we collect and why** (from section 3), **who sees your data** (from section 7), **how long we keep it** (section 3 retention + section 8), **your rights and how to use them** (section 5, incl. the contact mailbox and timelines).

**Public notice must NOT include:** internal access tables (section 6), breach response timelines (section 11), or decommissioning plans (section 9).

---

## 13. Maintenance

**Review cadence:** quarterly, plus any of: new product or collection point, new vendor handling personal data, a subject request that exposes a gap, a breach or near-miss, geographic expansion into a regulated jurisdiction, or a privacy complaint.

**How to update:** edit this file, bump "Last updated", note material changes in a change log, and push any public `/privacy` update the same week.
