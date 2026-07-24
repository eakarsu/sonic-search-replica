#!/bin/sh
set -eu
launcher_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_dir=${RUNTIME_PROJECT_SOURCE:-$launcher_dir}
[ -f "$launcher_dir/.env" ] || { echo 'Missing .env; copy .env.example and configure it.' >&2; exit 1; }
set -a
# shellcheck disable=SC1091
. "$launcher_dir/.env"
set +a
: "${BACKEND_PORT:?BACKEND_PORT must be assigned explicitly}"
case "$BACKEND_PORT" in *[!0-9]*|'') echo 'BACKEND_PORT must be an integer.' >&2; exit 1;; esac
if [ "${NODE_ENV:-production}" != production ]; then
  CORS_ORIGIN=${CORS_ORIGIN:-${CORS_ALLOWED_ORIGIN:-http://127.0.0.1:${FRONTEND_PORT:-$BACKEND_PORT}}}
  MEDIA_STORAGE_ROOT=${MEDIA_STORAGE_ROOT:-$launcher_dir/uploads}
  FRONTEND_DIST=${FRONTEND_DIST:-$project_dir/dist}
  export CORS_ORIGIN MEDIA_STORAGE_ROOT FRONTEND_DIST
fi
[ -d "$project_dir/backend/node_modules" ] || { echo 'Backend dependencies are missing; prepare them explicitly before startup.' >&2; exit 1; }
[ -f "$project_dir/dist/index.html" ] || { echo 'Frontend build is missing; run npm run build explicitly.' >&2; exit 1; }
: "${FRONTEND_PORT:?FRONTEND_PORT must be assigned explicitly}"
case "$FRONTEND_PORT" in *[!0-9]*|'') echo 'FRONTEND_PORT must be an integer.' >&2; exit 1;; esac
[ "$BACKEND_PORT" != "$FRONTEND_PORT" ] || { echo 'BACKEND_PORT and FRONTEND_PORT must differ.' >&2; exit 1; }

runtime_port=$(cd "$project_dir" && node -e "process.stdout.write(String(require('./backend/config').port))")
storage_root=$(cd "$project_dir" && node -e "process.stdout.write(require('./backend/config').mediaStorageRoot)")
[ -d "$storage_root" ] || { echo 'MEDIA_STORAGE_ROOT must be prepared before startup.' >&2; exit 1; }
[ -r "$storage_root" ] && [ -w "$storage_root" ] || { echo 'MEDIA_STORAGE_ROOT must be readable and writable.' >&2; exit 1; }
for assigned_port in "$runtime_port" "$FRONTEND_PORT"; do
  if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$assigned_port" -sTCP:LISTEN >/dev/null 2>&1; then echo "Port $assigned_port is occupied." >&2; exit 1; fi
done

(cd "$project_dir/backend" && node db/migrate.js --check)
API_PROXY_TARGET="http://127.0.0.1:$BACKEND_PORT"
VITE_API_BASE="http://127.0.0.1:$BACKEND_PORT"
export API_PROXY_TARGET VITE_API_BASE
backend_pid=''
frontend_pid=''
cleanup() {
  [ -n "$backend_pid" ] && kill "$backend_pid" 2>/dev/null || true
  [ -n "$frontend_pid" ] && kill "$frontend_pid" 2>/dev/null || true
  wait "$backend_pid" "$frontend_pid" 2>/dev/null || true
}
trap cleanup EXIT INT TERM
node "$project_dir/backend/server.js" & backend_pid=$!
attempt=0
while ! lsof -nP -iTCP:"$BACKEND_PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  kill -0 "$backend_pid" 2>/dev/null || { echo "Backend exited before binding $BACKEND_PORT" >&2; wait "$backend_pid"; exit 1; }
  [ "$attempt" -lt 120 ] || { echo "Backend did not bind $BACKEND_PORT within 30 seconds" >&2; exit 1; }
  sleep 0.25
  attempt=$((attempt + 1))
done
(cd "$project_dir" && npm run dev -- --host 127.0.0.1 --port "$FRONTEND_PORT" --strictPort) & frontend_pid=$!
wait "$backend_pid" "$frontend_pid"
