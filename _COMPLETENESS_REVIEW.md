# Completeness Review: sonic-search-replica

**Review date:** 2026-07-18

## Assessment basis

Static inspection of project-owned source and configuration only; no dependency installation, build, database migration, external-service call, or runtime launch was performed. The scan considered 168 project files (144 source files), 2 manifest(s), 0 test-like file(s), and 0 CI workflow(s), excluding dependency/generated directories.

## Classification

**Functional but incomplete**

This is a substantive but unfinished voice/media production application, not just an empty scaffold. Inspection found 144 source files across `src/`, `backend/` using Next.js, React, Express; however, the checked-in workflow and delivery controls do not yet demonstrate a complete, production-operable product.

## Why it is not complete

- Generated gap/visualization routes describe missing capabilities or simulate recommendations; they do not implement the underlying domain operation.
- Generic LLM calls are used as product behavior without enough typed tools, grounded evidence, deterministic rules, or output evaluation.
- Mock, demo, sample, fixture, or placeholder behavior remains in executable/product paths.
- No recognizable project-owned automated tests were found for the main workflow.
- No checked-in CI workflow proves builds, tests, migrations, and security checks on every change.

## Needed features

1. Add durable upload, transcoding/rendering, object storage, job status, retry, and cancellation workflows.
2. Integrate production speech/media providers with quotas, format validation, provenance, and provider failover.
3. Implement timeline/version management, preview approval, export presets, captions, and accessible playback.
4. Add fixture-based media pipeline tests plus load limits for large, malformed, and adversarial files.
5. Add risk-based unit, integration, and end-to-end tests in CI, including migration and failure-path coverage.

## Risks or launch blockers

- Credential/configuration exposure: environment files are present in the repository tree and must be checked against Git history and rotated if real.
- Weak/fallback secret patterns can permit forged sessions or accidental insecure deployments.
- Startup appears coupled to seed/migration behavior, risking data mutation or non-repeatable launches.
- AI-provider availability, cost, privacy, prompt injection, and unvalidated output are launch risks until bounded and evaluated.

## Evidence inspected

- `README.md`
- `backend/middleware/auth.js:10`
- `src/App.tsx:76`
- `backend/server.js`
- `package.json`
- `backend/start.sh`

## Recommended next action

Choose one real voice/media production journey, define acceptance criteria and external contracts, then close its persistence, permission, integration, failure, and test gaps before expanding features.

## Implementation progress (2026-07-20)

One coherent local workflow is now verified: an operator can register/sign in, receive a constrained JWT, create a persisted transcript, and list only that identity's transcripts. The broader production-media requirements remain explicit blockers and are not represented as complete.

Completed changes:

- Connected the visible `/signin` form to the real backend login instead of showing a simulated toast. Unconfigured social-login controls are disabled and their fake redirect code was removed.
- Removed tracked root/backend `.env` files and all fallback JWT secrets. Runtime now requires a unique JWT secret of at least 32 characters and an explicit PostgreSQL URL/CORS origin.
- Added fixed JWT issuer/audience, HS256 allowlisting, one-hour expiry, normalized emails, minimum registration password length, and uniform 401 login failures.
- Added a global authentication gate for every non-auth API. Previously public custom/gap endpoints now reject missing/tampered tokens.
- Moved table creation out of module-import/startup paths into explicit `backend/schema.sql`; routine startup no longer mutates schema or data.
- Replaced/added `start.sh` with a fail-closed loopback production launcher using existing builds/dependencies, readiness checks, occupied-port refusal, and own-child cleanup.
- Made disposable-runtime startup source-aware while retaining normal repository startup, required an explicitly assigned backend port, and mapped validator CORS/storage paths only outside production. Database migration/provisioning now loads only database configuration, so those explicit operator commands do not require unrelated HTTP/media runtime settings.
- Added acknowledgement-gated, idempotent administrator provisioning with bcrypt cost 12; it refuses to overwrite an existing account with different credentials, role, or active state.
- Restricted Vite and CORS hosts, added a frontend-to-backend production preview proxy, upgraded Vite to 8.1.5, removed obsolete tagger tooling, and reduced both frontend/backend dependency audits to zero known vulnerabilities.
- Added project-owned security tests, `.env.example`, `SECURITY.md`, CI build/audit/secret gates, and accurate local-demo documentation.

Verification performed:

- Frontend production build: passed (1,740 modules transformed).
- `npm test`: **5/5** project security/startup/UI-boundary tests and **5/5** backend tests passed against fresh PostgreSQL, including the full media workflow.
- Frontend and backend npm audits: zero known vulnerabilities.
- `start.sh`: started the built frontend/backend successfully with disposable PostgreSQL 14 and explicit schema; ports were clean after shutdown.
- Registration and valid login returned the expected operator; wrong password returned 401.
- `/api/auth/me` returned 200 with the signed token; missing and tampered credentials returned 401.
- Authenticated transcript creation/listing returned 200 and the owner-scoped list contained the created fixture.
- `/signin` returned 200 from the production frontend.
- Independent acceptance verification launched `start.sh` on fresh assigned loopback ports, logged in as the provisioned operator, revalidated that identity through `/api/auth/me`, and reached an authenticated product API (**API_VERIFIED / startup_login_session_api**).
- The integration rerun caught and corrected BIGINT identifier normalization in audit hashes; the global audit chain now verifies across create, processing, review, cancellation, and failure events. Frontend lint completed with **0 errors** (7 Fast Refresh organization warnings), and the Vite production build passed (19 modules).

Browser status: **BLOCKED_BROWSER**. The in-app browser service reported no browser instance, so visible clicking could not be performed. The production frontend proxy, real registration/login handler, JWT verification, identity endpoint, owner-scoped persistence, wrong-password path, missing-token path, and tampered-token path were exercised directly over HTTP; no visual pass is claimed.

Residual launch blockers: durable upload/object storage, validated media formats and size limits, transcoding/render job queue with retry/cancellation, real speech provider quotas/failover, timeline/version/approval/export/caption/accessibility workflows, retention/consent/biometric privacy controls, multi-tenant roles/audit, and adversarial/large-media fixture tests. In-memory gap/API-key/billing records remain demonstration-only and must not be treated as durable services.
