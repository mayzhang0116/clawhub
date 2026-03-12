---
summary: 'Offline/internal deployment plan: scope, phased delivery, and LDAP-first auth strategy.'
read_when:
  - Adapting ClawHub for a fully isolated intranet
  - Planning MVP vs phase 2 features
  - Aligning auth with corporate LDAP/OA systems
---

# Internal Offline Plan (LDAP-first)

This document captures the agreed direction for an **air-gapped/internal-only** edition of ClawHub.

## Confirmed scope

### Phase 1 (must-have)

- Skill version management (create/publish/rollback).
- Skill package upload/download and `SKILL.md` rendering.
- Keyword-based search (lexical search only).
- Admin console for role/moderation/audit operations.
- CLI support for `publish`, `search`, `install`, and `update`.
- Internal reporting (no external telemetry destinations).

### Phase 2 (later)

- Vector search powered by an internal model service.
- Comment/like/report social features.

### Explicitly out of scope

- SOUL mode.
- GitHub import.
- Any external telemetry sink.

## Auth strategy (simplified)

To avoid blocking implementation on SSO coordination, phase 1 uses a **single LDAP direct-login path** with configuration-driven setup.

### Design goals

- Keep auth provider implementation swappable.
- Avoid hard-coding external identity providers.
- Support a local/dev mock login for feature development when LDAP is unavailable.

### Minimum LDAP inputs (can be filled later)

- `LDAP_URL`
- `LDAP_BASE_DN`
- `LDAP_BIND_DN`
- `LDAP_BIND_PASSWORD`
- `LDAP_USER_FILTER`
- `LDAP_ENABLED`

### Suggested rollout

1. Build the auth module behind a feature flag (`LDAP_ENABLED`).
2. Implement mock/dev auth mode for local UI and permission flows.
3. Wire real LDAP bind/search after environment values are available.
4. Add login + role-change audit events.

## Internal-only guardrails

- Disable GitHub import actions/routes in the internal deployment profile.
- Disable outbound OpenAI usage in phase 1 (lexical search only).
- Disable outbound telemetry/webhook paths.
- Keep all secrets in internal env/config stores; do not commit secret values.

## Delivery checklist

### Application

- [ ] Remove external-only entry points from nav/UI.
- [ ] Keep core skill lifecycle flows fully functional.
- [ ] Ensure CLI workflows point to internal registry endpoints.

### Security

- [ ] Role model: at least `user` + `admin`.
- [ ] Audit log for login, publish, moderation, and role updates.
- [ ] Session/token expiry aligned with internal policy.

### Ops

- [ ] Provide `.env` template for internal deployment.
- [ ] Document fallback behavior when LDAP is temporarily unavailable.
- [ ] Document phase-2 extension points (internal vector provider).
