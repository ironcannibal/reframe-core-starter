# Reframe Core

**A personal business operating system, running on Claude Code.**

Reframe Core turns a fresh Claude Code project into a system that knows your business, reaches your tools, does real work, and eventually runs without being asked. You personalize it with a short `/onboard` interview, then use two recurring thinking skills (`/audit`, `/level-up`) to build leverage week over week.

Originally based on Nate Herk's open-source **AIS-OS** starter kit (AI Automation Society OS). The **Three Ms** framework ships here as Nate's, with attribution; the **Four Pillars** architecture is an evolution of his Four Cs of an AIOS™, credited to him as the origin (see the license note at the bottom).

---

## Getting started

1. **Clone this repo** into a folder you'll work from.
2. **Open it in Claude Code.**
3. **Run `/onboard`.** Answer 7 questions (about 10-15 minutes). It scaffolds your `context/`, `connections.md`, `references/voice.md`, and fills `CLAUDE.md`.
4. **Day 7: run `/audit`** to see your Four Pillars score.
5. **Day 14: run `/level-up`** to find and ship your first automation.

Secrets (API keys, tokens) go in **Doppler**, never in a `.env` file or in code. New to Doppler? See [references/doppler-secrets.md](references/doppler-secrets.md).

---

## The litmus test

> **"While you're not at your desk, your Reframe Core observes one real-world event and produces an output that's faster and more accurate than what you'd produce yourself."**

Every design decision rolls up to that test. If a layer, skill, or template doesn't contribute to it, it doesn't ship.

---

## Two frameworks

The system runs on two complementary frameworks. **Three Ms first, Four Pillars second.** Without the brain rewire, the architecture is just a folder structure.

### The Three Ms — operator brain (how you think)

| M | One-liner |
|---|---|
| **Mindset** | Default Shift, Function Breakdown, Curiosity Rule. *To what extent can AI be leveraged here?* |
| **Method** | Find Constraint → EAD (Eliminate, Automate, Delegate) → Map Process → Pick Autonomy Level → Tie to KPI. |
| **Machine** | Lego Principle, Validation Chain, Bike Method, Intern Rule, Kill Switch. *Boring is beautiful. Workflows beat agents.* |

Full breakdown in `references/3ms-framework.md`. `/level-up` walks all three weekly.

> *The Three Ms of AI™ is a trademark of Nate Herk. © 2026 Nate Herk.*

### The Four Pillars — architecture (what you build)

| # | Pillar | One-liner | "This pillar is in place" test |
|---|---|---|---|
| 1 | **Context** | Knows your business | A fresh session answers "what does this business do and who works here?" without browsing |
| 2 | **Connections** | Reaches your stuff | "What's on my calendar tomorrow and what tasks are due?" → live data, no paste |
| 3 | **Capabilities** | Knows how to do the work | A short phrase triggers a multi-step workflow that produces an artifact |
| 4 | **Cadence** | Runs without being asked | Laptop closed. A brief lands in the inbox. A teammate messages it and gets a real answer |

**Build path:** Context → Connections → Capabilities → Cadence. Context is non-skippable; Connections + Capabilities can build in parallel; Cadence is last (don't automate workflows that don't work manually).

The **three cornerstones** — security, ethics, privacy — are the trust band that runs through all four pillars, designed in at every step, not bolted on after.

> *The Four Pillars are an architecture model evolved from Nate Herk's Four Cs of an AIOS™. © 2026 Nate Herk.*

---

## The skills

| Skill | Type | When to run |
|---|---|---|
| `/onboard` | Setup wizard (one-time) | Day 1, right after clone. 7-question interview. Generates the Day-1 file set + fills `CLAUDE.md`. |
| `/audit` | Recurring thinking skill | Day 7, then weekly. Four Pillars gap report. Read-only. Watch the score climb. |
| `/level-up` | Recurring thinking skill | Day 14, then weekly. Three Ms interview (Mindset → Method → Machine). One run = one shipped artifact. |
| `/sop` | On demand | Draft a structured SOP from a free-form description. |

`/audit` asks *"is Reframe Core built right?"* (form). `/level-up` asks *"what business leverage am I missing?"* (function).

---

## Repo layout

```
reframe-core/
├── README.md
├── CLAUDE.md                        ← The operating manual (filled by /onboard)
├── EXPANSIONS.md                    ← What to add as you grow
├── LICENSE
├── .gitignore
├── aios-intake.md                   ← Source-of-truth for /onboard. Edit + re-run any time.
├── connections.md                   ← Registry of every system your Reframe Core can reach
├── context/                         ← About you, your business (filled by /onboard)
├── references/
│   ├── 3ms-framework.md             ← The operator brain
│   ├── doppler-secrets.md           ← How secrets work here (Doppler, never .env)
│   └── api-setup-template.md        ← Template for documenting each API you wire
├── decisions/
│   └── log.md                       ← Append-only record of what was decided and why
├── archives/                        ← Old stuff. Don't delete. Move here.
└── .claude/
    └── skills/
        ├── onboard/SKILL.md
        ├── audit/SKILL.md
        ├── level-up/SKILL.md
        └── sop/SKILL.md
```

See `EXPANSIONS.md` for what to add as you grow.

---

## License + attribution

Built on Nate Herk's MIT-licensed AIS-OS starter kit. MIT License. © 2026 Nate Herk.

The Three Ms of AI™ and The Four Cs of an AIOS™ are trademarks of Nate Herk. The **Three Ms** ship here as Nate's framework, attributed. The **Four Pillars** are an architecture model evolved from Nate's Four Cs and credited to him as the origin. Use freely; credit honestly.
