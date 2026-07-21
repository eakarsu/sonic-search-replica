# Sonic Search Replica — local voice workflow demonstration

This repository is verified only as a local, loopback-bound demonstration with
account registration/login, owner-scoped transcript persistence, and optional
server-managed AI calls. It is not affiliated with SoundHound/Houndify and is not a
production media pipeline. See `SECURITY.md` and `_COMPLETENESS_REVIEW.md`.

Verified startup requires an already prepared PostgreSQL database, existing dependency
installs, an existing frontend build, and runtime values from `.env.example`:

```sh
npm ci
npm ci --prefix backend
psql "$DATABASE_URL" -f backend/schema.sql # explicit initialization, disposable/local DB
npm run build
./start.sh
```

`start.sh` performs no dependency installation, schema/seed mutation, service startup,
or unrelated process termination. It serves the existing build on loopback, checks both
services for readiness, and stops only its child processes.
