# Connections

Registry of every system your Reframe Core can reach. Filled by `/onboard` from your Q4-Q7 answers; expanded over time as you wire new tools. `/audit` checks this file for domain coverage and freshness.

**Status legend:** `✓` wired (works inside this Reframe Core) ... `◐` live in your stack, not wired to Reframe Core ... `○` planned, not yet adopted ... `—` out of scope.

## The 7 universal data domains

Aim for coverage across these. One reachable connection per domain is the Day-1 target.

| # | Domain | Tool | Mechanism | Status | Last checked |
|---|---|---|---|---|---|
| 1 | Revenue / Financials | | not yet connected | ○ | — |
| 2 | Customer interactions | | not yet connected | ○ | — |
| 3 | Calendar | | not yet connected | ○ | — |
| 4 | Communication | | not yet connected | ○ | — |
| 5 | Project / task tracking | | not yet connected | ○ | — |
| 6 | Meeting intelligence | | not yet connected | ○ | — |
| 7 | Knowledge / files | | not yet connected | ○ | — |

**Mechanism options:** `mcp` (MCP server), `cli` (CLI binary on disk), `script` (Python/Bash hitting an API, in `scripts/`), `export` (CSV/JSON dump pipeline), `key+ref` (Doppler-stored key + `references/{tool}-api.md` guide), `not yet connected`.

## Second Brain (optional knowledge vault)

The long-term knowledge layer, separate from the 7 operational domains above. Optional — run `/second-brain` to learn the concept and set one up. Config lives in `context/second-brain.md`.

| Domain | Tool | Mechanism | Status | Last checked |
|---|---|---|---|---|
| Knowledge vault | | not yet connected | ○ | — |

*Status flips to `✓` when `/second-brain` records a vault. **Obsidian recommended.** Type `obsidian`/`markdown` → full support (`/close-session` + `/vault-lint` run). `gdrive`/`notion` → store only; the vault skills stay off (build-your-own).*

The kit is API-first: prefer a direct CLI or API call (with the key in Doppler ... see [references/doppler-secrets.md](references/doppler-secrets.md)) over heavier middleware, and reach for an MCP only when there's no API path.

When you wire a new tool, also save `references/{tool}-api.md` capturing endpoints, auth flow, and common queries (use [references/api-setup-template.md](references/api-setup-template.md)) ... researched once, saved forever.

## Always-on layers (for "runs while you're asleep" automations)

Options for scheduled, unattended work. Pick the lightest one that fits the job.

1. **GitHub Actions** ... free scheduled jobs. General-purpose cron.
2. **Vercel Cron** ... scheduled invocations of serverless functions. Use when the job is web-shaped.
3. **Supabase pg_cron / Edge Functions** ... database-level scheduled tasks.
4. **Cloudflare Workers Cron Triggers** ... edge-level scheduled tasks.
