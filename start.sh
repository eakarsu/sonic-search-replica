#!/bin/sh
set -eu
launcher_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_dir=${RUNTIME_PROJECT_SOURCE:-$launcher_dir}
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

runtime_port=$(cd "$project_dir" && node -e "process.stdout.write(String(require('./backend/config').port))")
storage_root=$(cd "$project_dir" && node -e "process.stdout.write(require('./backend/config').mediaStorageRoot)")
[ -d "$storage_root" ] || { echo 'MEDIA_STORAGE_ROOT must be prepared before startup.' >&2; exit 1; }
[ -r "$storage_root" ] && [ -w "$storage_root" ] || { echo 'MEDIA_STORAGE_ROOT must be readable and writable.' >&2; exit 1; }
if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$runtime_port" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $runtime_port is occupied." >&2
  exit 1
fi

(cd "$project_dir/backend" && node db/migrate.js --check)
exec node "$project_dir/backend/server.js"
