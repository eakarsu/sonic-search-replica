# Security boundary

This project supports a local demonstration only. JWTs use an operator-provided secret,
fixed issuer/audience, HS256 allowlisting, and one-hour expiry. Every non-auth API is
protected; transcripts are filtered by the authenticated user. Provider credentials stay
on the backend. Do not use real voice/biometric/customer data or production provider keys.

Production release requires durable media storage/transcoding jobs, file validation and
malware limits, retry/cancellation, retention/deletion, consent/biometric privacy controls,
tenant/RBAC/audit design, provider quotas/failover, and end-to-end adversarial media tests.
