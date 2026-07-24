#!/bin/sh
set -eu
# Local demo credential bridge (managed by tools/fix_demo_autofill.mjs)
demo_credentials_project_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
if [ -f "$demo_credentials_project_dir/.env" ]; then
  while IFS= read -r demo_credentials_line || [ -n "$demo_credentials_line" ]; do
    case "$demo_credentials_line" in ''|'#'*) continue ;; esac
    demo_credentials_line="${demo_credentials_line#export }"
    demo_credentials_key="${demo_credentials_line%%=*}"
    demo_credentials_value="${demo_credentials_line#*=}"
    case "$demo_credentials_key" in
      NODE_ENV|ENABLE_DEMO_CREDENTIAL_AUTOFILL|DEMO_EMAIL|DEMO_PASSWORD|SEED_ADMIN_EMAIL|SEED_ADMIN_PASSWORD|SEED_USER_EMAIL|SEED_USER_PASSWORD|PROVISION_ADMIN_EMAIL|PROVISION_ADMIN_PASSWORD|BOOTSTRAP_ADMIN_EMAIL|BOOTSTRAP_ADMIN_PASSWORD|ADMIN_EMAIL|ADMIN_PASSWORD|DEFAULT_EMAIL|DEFAULT_PASSWORD|DEMO_TENANT|BOOTSTRAP_TENANT_SLUG|GOVERNANCE_TENANT_ID|TENANT_ID) ;;
      *) continue ;;
    esac
    [ -n "${!demo_credentials_key+x}" ] && continue
    demo_credentials_first="${demo_credentials_value:0:1}"
    demo_credentials_last="${demo_credentials_value: -1}"
    if { [ "$demo_credentials_first" = '"' ] && [ "$demo_credentials_last" = '"' ]; } || { [ "$demo_credentials_first" = "'" ] && [ "$demo_credentials_last" = "'" ]; }; then
      demo_credentials_value="${demo_credentials_value:1:${#demo_credentials_value}-2}"
    fi
    export "$demo_credentials_key=$demo_credentials_value"
  done < "$demo_credentials_project_dir/.env"
fi
demo_credentials_email=""
demo_credentials_password=""
demo_credentials_tenant="${DEMO_TENANT:-${BOOTSTRAP_TENANT_SLUG:-${GOVERNANCE_TENANT_ID:-${TENANT_ID:-}}}}"
demo_credentials_tenant="${DEMO_TENANT:-${BOOTSTRAP_TENANT_SLUG:-${GOVERNANCE_TENANT_ID:-${TENANT_ID:-}}}}"
demo_credentials_tenant="${DEMO_TENANT:-${BOOTSTRAP_TENANT_SLUG:-${GOVERNANCE_TENANT_ID:-${TENANT_ID:-}}}}"
if [ -n "${PROVISION_ADMIN_EMAIL:-}" ] && [ -n "${PROVISION_ADMIN_PASSWORD:-}" ]; then
  demo_credentials_email="$PROVISION_ADMIN_EMAIL"
  demo_credentials_password="$PROVISION_ADMIN_PASSWORD"
elif [ -n "${BOOTSTRAP_ADMIN_EMAIL:-}" ] && [ -n "${BOOTSTRAP_ADMIN_PASSWORD:-}" ]; then
  demo_credentials_email="$BOOTSTRAP_ADMIN_EMAIL"
  demo_credentials_password="$BOOTSTRAP_ADMIN_PASSWORD"
elif [ -n "${SEED_ADMIN_EMAIL:-}" ] && [ -n "${SEED_ADMIN_PASSWORD:-}" ]; then
  demo_credentials_email="$SEED_ADMIN_EMAIL"
  demo_credentials_password="$SEED_ADMIN_PASSWORD"
elif [ -n "${SEED_USER_EMAIL:-}" ] && [ -n "${SEED_USER_PASSWORD:-}" ]; then
  demo_credentials_email="$SEED_USER_EMAIL"
  demo_credentials_password="$SEED_USER_PASSWORD"
elif [ -n "${DEMO_EMAIL:-}" ] && [ -n "${DEMO_PASSWORD:-}" ]; then
  demo_credentials_email="$DEMO_EMAIL"
  demo_credentials_password="$DEMO_PASSWORD"
elif [ -n "${ADMIN_EMAIL:-}" ] && [ -n "${ADMIN_PASSWORD:-}" ]; then
  demo_credentials_email="$ADMIN_EMAIL"
  demo_credentials_password="$ADMIN_PASSWORD"
elif [ -n "${DEFAULT_EMAIL:-}" ] && [ -n "${DEFAULT_PASSWORD:-}" ]; then
  demo_credentials_email="$DEFAULT_EMAIL"
  demo_credentials_password="$DEFAULT_PASSWORD"
fi
if [ "${NODE_ENV:-development}" != production ] && [ "${ENABLE_DEMO_CREDENTIAL_AUTOFILL:-true}" = true ] && [ -n "$demo_credentials_email" ] && [ -n "$demo_credentials_password" ]; then
  export NEXT_PUBLIC_ENABLE_DEMO_CREDENTIAL_AUTOFILL=true
  export NEXT_PUBLIC_DEMO_EMAIL="$demo_credentials_email"
  export NEXT_PUBLIC_DEMO_PASSWORD="$demo_credentials_password"
  export VITE_ENABLE_DEMO_CREDENTIAL_AUTOFILL=true
  export VITE_DEMO_EMAIL="$demo_credentials_email"
  export VITE_DEMO_PASSWORD="$demo_credentials_password"
  export REACT_APP_ENABLE_DEMO_CREDENTIAL_AUTOFILL=true
  export REACT_APP_DEMO_EMAIL="$demo_credentials_email"
  export REACT_APP_DEMO_PASSWORD="$demo_credentials_password"
  if [ -n "$demo_credentials_tenant" ]; then
    export NEXT_PUBLIC_DEMO_TENANT="$demo_credentials_tenant"
    export VITE_DEMO_TENANT="$demo_credentials_tenant"
    export REACT_APP_DEMO_TENANT="$demo_credentials_tenant"
  else
    unset NEXT_PUBLIC_DEMO_TENANT VITE_DEMO_TENANT REACT_APP_DEMO_TENANT
  fi
else
  export NEXT_PUBLIC_ENABLE_DEMO_CREDENTIAL_AUTOFILL=false
  export VITE_ENABLE_DEMO_CREDENTIAL_AUTOFILL=false
  export REACT_APP_ENABLE_DEMO_CREDENTIAL_AUTOFILL=false
  unset NEXT_PUBLIC_DEMO_EMAIL NEXT_PUBLIC_DEMO_PASSWORD NEXT_PUBLIC_DEMO_TENANT
  unset VITE_DEMO_EMAIL VITE_DEMO_PASSWORD VITE_DEMO_TENANT
  unset REACT_APP_DEMO_EMAIL REACT_APP_DEMO_PASSWORD REACT_APP_DEMO_TENANT
fi
unset demo_credentials_email demo_credentials_password demo_credentials_tenant demo_credentials_project_dir demo_credentials_line demo_credentials_key demo_credentials_value demo_credentials_first demo_credentials_last

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
