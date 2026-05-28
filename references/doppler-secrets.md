# Doppler: Secrets, the Right Way

> **New to Doppler? Start here.** This is the 5-minute version for someone who has never used it. Doppler is where every API key, token, and password in this Reframe Core lives. Not in a `.env` file. Not in your code. Not pasted into chat. Doppler.

---

## Why Doppler instead of a `.env` file

Security is one of the three cornerstones this whole system is built on. A `.env` file fails that bar:

- It sits in plaintext on disk. Anyone who reads the folder reads your keys.
- It gets committed by accident. One bad `git add .` and your Stripe key is in public history forever.
- It gets copied. Into Slack, into a screenshot, into a backup, onto a second laptop. Every copy is a new place to leak from.
- It has no audit trail. You can't tell who read it, when, or whether it ever leaked.

Doppler fixes all four:

- Secrets live in an encrypted vault, not on your disk.
- Nothing to commit ... so nothing to leak through git.
- One source of truth. Rotate a key in one place and every machine picks it up.
- Full activity log. You can see every read and every change.

The rule for this kit is simple: **secrets go in Doppler, never in `.env`.** Every `references/{tool}-api.md` guide repeats it.

---

## The mental model

Four words, biggest to smallest:

1. **Workspace** ... your whole Doppler account. You name yours when you sign up.
2. **Project** ... one per tool. `firecrawl`, `clickup`, `twilio`, `vercel`, and so on.
3. **Config** ... an environment inside a project. Usually `dev` (your machine) and `prd` (production).
4. **Secret** ... a single key-value pair. `FIRECRAWL_API_KEY = fc-abc123...`.

So a full address reads like `firecrawl / dev / FIRECRAWL_API_KEY`. That's the same shape you'll see written in every connections and API-reference file.

---

## First-time setup (do this once per machine)

**1. Install the CLI.**

- Windows: `winget install Doppler.doppler`
- macOS: `brew install dopplerhq/cli/doppler`
- Linux: see https://docs.doppler.com/docs/install-cli

**2. Log in.** Opens a browser, you approve, done.

```bash
doppler login
```

**3. Bind this folder to a project + config.** Run this from the repo directory. It writes a tiny `doppler.yaml` so Doppler knows which project/config to use here. (The `.yaml` holds NO secrets ... just the names. Safe to commit.)

```bash
doppler setup
```

That's it. You're wired.

> **Cross-machine note:** Doppler is installed and authed per machine. If you switch laptops, repeat steps 1-3 there.

---

## Everyday use

**Store a key** (the prompt hides it as you type ... better than putting it on the command line where it lands in shell history):

```bash
doppler secrets set FIRECRAWL_API_KEY
```

**List what's in the current config:**

```bash
doppler secrets
```

**Read one value back** (use sparingly ... this prints the secret):

```bash
doppler secrets get FIRECRAWL_API_KEY --plain
```

**Use a secret in a command.** This is the magic move. `doppler run --` injects every secret as an environment variable for the length of one command, then they vanish. The key never touches a file.

```bash
doppler run -- curl -H "Authorization: Bearer $FIRECRAWL_API_KEY" https://api.firecrawl.dev/v1/...
```

Every API example in this kit is written as `doppler run -- <the actual command>`. That prefix is what keeps the key out of your code.

---

## The golden rules

1. **Never paste a key into a file, chat, commit, or screenshot.** If it leaves Doppler, treat it as leaked and rotate it.
2. **Never hardcode a key in a script.** Reference it as `$KEY_NAME` and run the script with `doppler run --`.
3. **One key, one job.** Scope each key to the least it needs (read-only, single resource) so a leak is contained.
4. **Rotate on any doubt.** Regenerate at the vendor, update the one value in Doppler, done. Every machine is current instantly.
5. **`.env` stays in `.gitignore`** as a backstop, but you should never be creating one. If you find yourself making a `.env`, stop ... use Doppler.

---

## This kit's naming convention

Stay consistent so future-you (or whoever inherits this) can find anything fast:

| Piece | Convention | Example |
|---|---|---|
| Project | the tool name, lowercase | `cloudflare` |
| Config | the environment | `dev`, `prd` |
| Secret | `TOOL_PURPOSE`, SCREAMING_SNAKE | `CLOUDFLARE_BR_TOKEN` |

When you wire a new tool, record its Doppler address in [connections.md](../connections.md) and in the tool's `references/{tool}-api.md` (use [api-setup-template.md](api-setup-template.md)). Researched once, saved forever.

---

## When something breaks

- **`doppler: command not found`** right after install ... your PATH hasn't refreshed. Restart the terminal (or Claude Code).
- **`You must provide a project and config`** ... you skipped `doppler setup` in this folder, or you're in the wrong folder. Re-run it.
- **Secret is empty / wrong** inside `doppler run` ... you're pointed at the wrong config. Check `doppler configure` to see what this folder is bound to.
- **Scope mismatch** (auth bound to a different path than this repo) ... re-auth with `doppler login --scope /`.

---

## Going further

- **Doppler → Vercel** (auto-push secrets to a deployed site): see [sops/doppler-vercel-sync.md](sops/doppler-vercel-sync.md).
- **Official docs:** https://docs.doppler.com
