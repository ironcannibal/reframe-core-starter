# Escalations

Packets written by `/escalate` land here as `YYYY-MM-DD-{slug}.md`.

Each one is a self-contained snapshot: what you were working on, what broke, what was already ruled out, your project and connection state, and your own note. Written so a human on the other end can upload it into their AI and pick up mid-problem.

## What's in here, and what isn't

**Is:** session history, error output, project structure, connections by name and auth status, environment details, your notes.

**Isn't:** passwords, API keys, tokens, refresh tokens, `.env` contents. `/escalate` strips those before you ever see a preview, and logs every strike in the packet's redaction table. If a detail looks missing from an old packet, it was a credential.

## Keeping them

These are your record of what went wrong and what got fixed. They're worth keeping — an escalation from four months ago is often the fastest answer to the same problem happening again.

They're tracked in git along with the rest of the repo. If your repo is pushed somewhere shared and a packet holds business detail you'd rather not have there, delete the file or add `escalations/` to `.gitignore`. The packet on the other end is governed by whatever agreement you have with your support contact (see `context/support.md`).

## Anything in here can be re-sent

Attaching an old packet to a new email works fine. Nothing about it expires.
