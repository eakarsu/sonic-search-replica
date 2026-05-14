# Audit Note: sonic-search-replica

## Bucket: HAS_CODE_NO_AI (Bucket E) — backend scaffolded

## Determination

- File count: 115 source files (.ts/.tsx/.js)
- LLM-provider scan: 0 hits across the entire project tree
- Existing code is a **frontend-only** Vite/React/TypeScript SPA — a marketing-site clone for a Houndify-style voice-AI / voice-search platform (pages: VoiceAI, VoiceChat, VoiceSearch, Houndify, Automotive, IoT, MobileApps, CustomerService, Enterprise, Documentation, etc.)
- No backend, no API routes, no AI integration — the React app is purely presentational.
- `package.json` is the Vite/React shadcn-ui template (`vite_react_shadcn_ts`).

Audit report `batch_11.md` classifies sonic-search-replica as **template-clone — Node skeleton for search functionality**, with insufficient code visibility flagged.

## Action Taken

Scaffolded a Node/Express backend at `backend/` matching the
`/Users/erolakarsu/projects/AIWeddingPlanner/backend/` reference pattern,
with **12 voice-AI / voice-search domain-specific** AI endpoints powered by
OpenRouter (`anthropic/claude-haiku-4.5`).

### Files written (all `node --check` pass)

| Path | Purpose |
|---|---|
| `backend/package.json` | Express + pg + jwt + bcrypt + node-fetch deps |
| `backend/server.js` | Express bootstrap; mounts `/api/auth`, `/api/ai`, `/api/health` |
| `backend/db.js` | Postgres pool factory |
| `backend/middleware/auth.js` | JWT bearer-token verifier |
| `backend/routes/auth.js` | `/register`, `/login` |
| `backend/routes/ai.js` | 12 voice-AI endpoints + `/history` |
| `backend/.env.example` | All required env vars |
| `backend/start.sh` | `node server.js` launcher (executable) |

### AI endpoints (domain-specific to voice-AI / voice-search)

1. `POST /api/ai/intent-classify` — classify spoken intent (search/command/question/navigation/transaction)
2. `POST /api/ai/entity-extract` — slot/entity extraction with span offsets + ISO-8601 normalisation
3. `POST /api/ai/asr-correct` — fix homophones/punctuation in raw ASR output using n-best hypotheses
4. `POST /api/ai/voice-search-rewrite` — rewrite spoken query to optimised search query
5. `POST /api/ai/wakeword-suggest` — suggest custom wake-words with phonetic-distinctiveness scoring
6. `POST /api/ai/custom-domain-train` — generate training utterances + BIO-annotated slot examples
7. `POST /api/ai/dialog-respond` — generate next assistant turn (SSML + plain text)
8. `POST /api/ai/summarize-call` — contact-center call summariser with compliance flags
9. `POST /api/ai/voice-command-route` — route command to skill, with disambiguation prompts
10. `POST /api/ai/transcript-redact` — PII redaction with typed placeholders + jurisdiction awareness
11. `POST /api/ai/accent-locale-suggest` — recommend acoustic/locale model from text cues
12. `POST /api/ai/false-trigger-analyze` — root-cause analysis for wake-word false triggers
13. `GET  /api/ai/history` — paginated retrieval of stored AI results

All endpoints persist their outputs to a Postgres `ai_results` table (created idempotently
on startup along with `voice_transcripts` and `custom_domains` tables) and read
`process.env.OPENROUTER_API_KEY` with model `anthropic/claude-haiku-4.5`.

## Constraints honoured

- No frontend code touched.
- No npm install run (caller must `npm install` inside `backend/` before first launch).
- No external integrations beyond OpenRouter and Postgres.
- Every JS file written passed `node --check`.
- Endpoints are domain-specific to voice-AI / voice-search, not generic chatbot wrappers.

## Outstanding (per audit recommendations not in scope here)

- Real ASR streaming endpoint (requires audio infrastructure, out of this scaffold's scope).
- WebSocket for real-time voice transcripts.
- Vector store for semantic search across stored transcripts.
- Frontend wiring to call these new endpoints (skipped per "no frontend" constraint).

## Apply pass 3 (frontend)

- **Status:** CREATED-FE — minimal AI Playground page added.
- Pre-existing FE was a marketing-site clone (Houndify-style landing pages) with no wiring to the pass-1 backend. This pass adds a single playground page so the 12 backend endpoints are reachable from the UI.
- New file: `src/pages/AIPlayground.tsx` — endpoint dropdown + form + JSON result panel. Surfaces 3 of the 12 endpoints (`intent-classify`, `voice-search-rewrite`, `asr-correct`); architected to extend to the rest by adding entries to its `ENDPOINTS` map.
- Wired into `src/App.tsx` at route `/ai-playground` (no Header link added — page is reachable by URL; nav link is optional).
- Auth: reads JWT from `localStorage.getItem("token")` and sends `Authorization: Bearer <token>`. Surfaces a clear "AI not configured" message on 503 (matches canonical `OPENROUTER_API_KEY`-missing pattern).
- Styling: matches existing `SignIn.tsx` / `GetStarted.tsx` (Tailwind + `Header` + `Footer` + `ScrollArea` + shadcn `Button`). No new dependencies.
- API base: reads `VITE_API_BASE` from `import.meta.env`, defaults to `http://localhost:3001`.

### Backlog (frontend)
- Add the remaining 9 endpoints to the playground (mechanical: extend `ENDPOINTS`).
- Add a sign-in form that posts to `/api/auth/login` and stores the JWT (currently the user must populate `localStorage.token` manually or via the new backend's auth route).
- Add a History tab that calls `GET /api/ai/history`.
- Pre-existing TS casing collision in `src/App.tsx` line 32 (`./pages/developers/documentation` vs `Documentation.tsx`) is unrelated to this pass and was not introduced by it.

## Apply pass 4 (mechanical backlog)

Tackled the FE backlog item: "Add the remaining 9 endpoints to the playground (mechanical: extend `ENDPOINTS`)."

- **FE only — no BE changes** (all 12 backend endpoints already exist from pass 1).
- Extended `src/pages/AIPlayground.tsx` `EndpointKey` union and `ENDPOINTS` map with 9 additional entries: `entity-extract`, `wakeword-suggest`, `custom-domain-train`, `dialog-respond`, `summarize-call`, `voice-command-route`, `transcript-redact`, `accent-locale-suggest`, `false-trigger-analyze`. Field names (`transcript`, `wakeWord`, `surroundingTranscript`, `sampleTranscript`, etc.) match the request-body parameter names that the corresponding handlers in `backend/routes/ai.js` actually destructure, so the new entries will work out-of-the-box.
- The original 3 entries are unchanged. (Note: their `utterance` / `query` / `raw_transcript` keys do not match the BE's `transcript` / `spokenQuery` / `rawTranscript` — pre-existing pass-3 bug; per "don't touch working code" left as-is.)
- No new deps. Bracket balance verified; `tsc --noEmit -p tsconfig.app.json` shows only the same pre-existing case-collision error noted in pass 3.
- 503 handling already present in the playground submit handler — re-used for all new endpoints.

### Remaining backlog (FE)
- Sign-in form on the marketing site to mint a JWT.
- History tab calling `GET /api/ai/history`.
- Field-name fix for the original 3 endpoints to match BE.

## Apply pass 5 (all backlog)

Closed all 3 remaining FE backlog items. No backend changes (no `node_modules`
locally; pass rule forbids `npm install`).

- **FE:** all changes in `src/pages/AIPlayground.tsx`.
  1. **Sign-in form** (was: "Add a sign-in form that posts to `/api/auth/login`").
     New "Sign-in" tab with email/password form. Posts to `${VITE_API_BASE}/api/auth/login`
     and stores the returned JWT in `localStorage.token`. Includes a sign-out button
     that clears the token. The tab label shows a check-mark when a token is present.
  2. **History tab** (was: "Add a History tab that calls `GET /api/ai/history`").
     New "History" tab. Auto-fetches on tab switch and supports manual refresh.
     Renders the response JSON. Surfaces 503 with a "Sign in first" hint when
     no token is in localStorage.
  3. **Field-name fix** (was: "the original 3 endpoints' keys do not match the BE").
     Original `intent-classify`, `voice-search-rewrite`, `asr-correct` entries in
     `ENDPOINTS` map now use `transcript` / `spokenQuery,searchDomain,locale` /
     `rawTranscript,alternativeHypotheses,domain` — matching what the backend handlers
     in `backend/routes/ai.js` actually destructure. Also added a `required?` flag on
     input definitions so optional fields are no longer marked `required` in the DOM.

- **Verification:**
  - `tsc --noEmit -p tsconfig.app.json`: only the *pre-existing*
    `developers/documentation` case-collision error (unrelated to this pass).
  - `vite build`: PASS, 1736 modules transformed.

### Remaining backlog
None. The other items from previous passes (real ASR streaming, WebSocket transcripts,
vector store) require backend infra changes that are out of scope for an additive pass.
