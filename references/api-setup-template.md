# API Setup: {Tool Name}

> **How to use:** Copy this template to `references/{tool}-api.md` when wiring a new API. Claude fills it during research; you review; then you wire. Researched once, saved forever. Never re-research the same API.
>
> **When to use this template vs. just wiring:** Use the template whenever an API touches money, customer data, outbound communication, or scheduled execution. Skip it for one-off read-only queries to public endpoints.

---

## Basics

- **Tool:** {name}
- **Purpose in Reframe Core:** {one sentence on what we use it for}
- **Official docs:** {URL}
- **Dashboard / web UI:** {URL}
- **Pricing page:** {URL}
- **Status:** `◐ researched` | `✓ wired` | `○ planned`
- **Last verified:** YYYY-MM-DD

## Auth

- **Method:** {API key | OAuth2 | JWT | HMAC | mTLS | basic}
- **How to get credentials:** {steps inside the dashboard, including any verification gates}
- **Stored in:** Doppler project `{project-name}`, config `{config-name}`, key name `{KEY_NAME}` (new to Doppler? see [doppler-secrets.md](doppler-secrets.md))
- **Scopes / permissions granted:** {explicit list; principle of least privilege}
- **Rotation policy:** {never | quarterly | on-demand | on incident}
- **Revocation path:** {how to kill a compromised key fast}

## Endpoints we use

Only document what we actually call. Add rows as use cases expand.

| Operation | Method | Path | Rate limit | Notes |
|---|---|---|---|---|
| {what it does} | GET / POST | `/v1/resource` | {N/sec or N/day} | pagination, gotchas, idempotency |

## Sample requests

### {Canonical operation 1}

```bash
doppler run -- curl -X POST 'https://api.example.com/v1/thing' \
  -H "Authorization: Bearer $API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"field":"value"}'
```

### {Canonical operation 2}

{additional samples as needed; show the smallest working invocation, not the kitchen sink}

## Cost & quotas

- **Free tier:** {limits ... requests/month, MB/month, seats, etc.}
- **Pricing past free:** {per-request | per-month | per-seat | usage tiers}
- **Behavior at the limit:** {`429` + retry-after | hard block | queue | overage billing}
- **Budget cap or alert:** {set where? at what threshold? notifies whom?}
- **Plan we're on:** {free | startup | etc.} (track upgrades here)

## Webhooks (if applicable)

- **Supported events:** {list of event types we'd subscribe to}
- **Receiver URL:** {where we point them ... Vercel function, Cloudflare Worker, n8n webhook}
- **Signature verification:** {how we verify the webhook is actually from the vendor; share secret stored in Doppler at `{KEY_NAME}`}
- **Retry behavior:** {vendor's retry policy on 5xx from our receiver}

## Three cornerstones

Required per Reframe Core standard. Every API touches at least one of these; document the answers up front.

### Security

- **Key storage:** Doppler at `{path}`; never in `.env`, never in source, never in chat scrollback.
- **Attack surface:** {what's exposed if the key leaks? read-only? account-wide? per-resource?}
- **Compromise blast radius:** {what a stolen key actually enables}
- **Mitigation in place:** {key scope, IP allowlist, rate limit, monitoring}
- **Logging:** {does the vendor expose an audit log? where? who reviews?}

### Ethics

- **Data sources the API touches:** {whose data flows through, with or without their explicit consent}
- **Use boundaries:** {explicit list of things we will NOT do with this API ... e.g., "no automated outreach to scraped contacts" if that's a standing rule}
- **Downstream effects:** {who could be harmed by misuse, even unintentional}

### Privacy

- **PII flowing through:** {names, emails, phone, payment, health, location, behavior; categorize)
- **Vendor retention:** {how long the vendor stores the data, link to their policy}
- **Our retention:** {how long we keep what we receive back}
- **Subject rights flow:** {how a user's deletion / access request gets fulfilled through this vendor}
- **Breach notification path:** {what we do if the vendor reports a breach involving this data}

## SDKs / wrappers (note only what we're using)

- {language}: {install command + version pin} ... using? Y / N
- Skip listing SDKs we're not using.

## Open questions / verify before going live

- {anything I couldn't confirm during research, gated on your input, or that requires a test call against the real account}

---

**Maintenance:** When this API changes (new endpoints, new pricing, breaking auth changes), update the file and bump `Last verified`. Stale API docs are worse than no docs.
