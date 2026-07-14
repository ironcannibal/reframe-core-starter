---
name: roast
description: Use when the operator asks to roast an idea, pressure-test or stress-test an idea, validate a business idea, "convene the council", get a brutal second opinion before building something, or says "/roast". Spins up a 5-persona council that attacks the idea from every angle, then a Judge returns one GO / RESHAPE / KILL verdict with the cheapest test to de-risk it.
argument-hint: "[the idea to roast]"
three-ms-attribution: |
  Council/Judge pattern adapted from Nate Herk's /roast. © 2026 Nate Herk.
---

> *Adapted from Nate Herk's /roast council pattern. © 2026 Nate Herk.*

## What this does

Claude's default is to agree with you. `/roast` is the opposite. It convenes a council of five independent persona agents who tear an idea apart and build it up from every angle, then a Judge (you) synthesizes everything into one honest verdict. Use it before the operator sinks time and money into building the wrong thing.

The council is adversarial on purpose. No persona is allowed to hedge or be polite. The point is to surface what the operator can't see because they're too close to it.

## Step 1: Get the brief

If `$ARGUMENTS` contains the idea, start there. Then ask a tight set of clarifying questions so the council has real context. Ask only what hasn't already been provided. Keep it to 3-4 questions max, in one batch:

1. **The idea** in one or two sentences (what it is, what it does).
2. **Who it's for** and **how it makes money** (the buyer + the price/model).
3. **The operator's edge** — relevant skills, audience, or assets already in hand.
4. **Constraints** — budget, timeline, how fast first dollar is needed.

If the operator says "just run it" or gives you enough already, skip the questions and proceed. Don't over-interrogate. One round, then convene the council.

Write the brief into a single short paragraph you paste into every council member's prompt, so all five judge the same thing.

## Step 2: Convene the council (5 agents, in parallel)

Spin up **all five agents in parallel in a single message** (one Agent/Task call each, `subagent_type: general-purpose`). Paste the same brief into each, then give each its persona mandate below.

Each council member must return: a one-line stance, their 3-5 sharpest points, the single most important thing the operator must hear, and a 1-10 score on their own dimension (1 = walk away, 10 = no-brainer).

**1. The Contrarian (Red Team)**
> You are the Contrarian on an idea council. Assume this idea fails. Your job is to find the fatal flaws, the fastest way it dies, and the load-bearing assumptions that are probably wrong. Be ruthless and specific. No hedging, no "but it could work." Attack the weakest points. THE BRIEF: [brief]

**2. The Expansionist (Bull)**
> You are the Expansionist on an idea council. Make the strongest possible case FOR this idea. Find the biggest upside, the 10x version, the adjacent opportunities and unlock points the founder isn't seeing. Fight for the potential. Be specific about where the real money and leverage could be. THE BRIEF: [brief]

**3. The Logician (First principles)**
> You are the Logician on an idea council. Use NO outside research and NO web. Reason purely from first principles: does the core mechanism make sense, do the incentives line up, is the underlying logic sound, does the math even work in theory? Strip it to fundamentals and tell us if it holds together. THE BRIEF: [brief]

**4. The Researcher (Evidence)**
> You are the Researcher on an idea council. Use web search. Bring real-world evidence: who the existing competitors are, market size or demand signals, what comparable products charge, whether this is validated by what's already out there or contradicted by it. Cite what you find. Is the real world saying yes or no? THE BRIEF: [brief]
>
> GUARDRAIL — never web-search the operator, their business, or any of their named clients by name. Your job is the *market/category*: competitors, comparable pricing, demand signals. If the idea names a specific person/company that is the operator or their client, research the category around it, not the individual.

**5. The Buyer (Voice of customer)**
> You are the Buyer on an idea council. Role-play the exact target customer described in the brief. React as them, in first person. Would you actually pay for this? What's your real objection? What would make you choose a competitor or just do nothing instead? What price feels right, and what would make you say yes today? Be the honest, slightly skeptical customer, not a cheerleader. THE BRIEF: [brief]

## Step 3: The Judge delivers the verdict

Once all five return, YOU act as the Judge. Read every council member's findings, weigh them, and synthesize one decisive verdict. Do not just average the scores. Name the real tension between the personas and resolve it.

Fold in the **economics lens** yourself: rough pricing, realistic time-to-first-dollar, and whether the operator can actually ship this fast given the edge described. When relevant, run it through the **three cornerstones** (security / ethics / privacy) and an annoyance-vs-constraint check (is this a bottleneck worth removing, or just busywork?).

Output the verdict in this exact shape:

```
## THE VERDICT: GO / RESHAPE / KILL
Confidence: [low / medium / high]

**The call in one line:** [the decision, plainly]

**Why:** [2-3 sentences resolving the council's tension]

**Biggest risk:** [the single thing most likely to kill it]
**Biggest upside:** [the strongest reason to do it]

**Money read:** [rough price, time-to-first-dollar, can they ship fast]

**The cheapest 48-hour test:** [the smallest, fastest thing the operator can do
to validate the riskiest assumption BEFORE building anything]

**If RESHAPE:** [the specific pivot that fixes the fatal flaw while keeping the upside]
```

Then list the five council scores in one line: `Contrarian X/10 · Expansionist X/10 · Logician X/10 · Researcher X/10 · Buyer X/10`.

## Rules

- Every persona stays in character. None of them hedges or softens. The value is in the friction.
- The Judge must make an actual call. "It depends" is not a verdict. Pick GO, RESHAPE, or KILL and own it.
- The cheapest 48-hour test is the most important output. It's how the operator finds out if they're right without building the whole thing.
- Keep the final verdict skimmable. The council does the depth; the Judge does the decision.
- Match the operator's voice in the verdict: short sentences, no em dashes, concrete numbers, no hype.
