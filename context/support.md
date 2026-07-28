# Support

Who to reach when this Reframe Core hits a wall. `/escalate` reads this file to know where a packet goes.

```
support_contact: Mike Thomson
support_email: mike@freshstarts.io
support_org: Fresh Start Marketing / freshstarts.io
support_method: Business Reframing™
response_target: one business day
```

## What escalating actually does

`/escalate` builds one markdown file that holds everything a human (and their AI) needs to help: what you were doing, what broke, what's already been ruled out, your connections and their auth status, and your own note in your own words. You review every line before it leaves your machine. Then it goes out as an email from your own account.

Nothing is sent automatically. Nothing containing a password, key, or token is ever included.

## Two kinds of escalation

- **Support** — something is broken or stuck. The goal is to get it working.
- **Project** — the work is real and bigger than this kit. The goal is to get it scoped.

The Core picks one and tells you which. You can flip it.

## Changing the contact

If someone else supports this install (an internal ops lead, a different consultant), edit the block above. `/escalate` uses whatever is there. Nothing else in the kit depends on this file.
