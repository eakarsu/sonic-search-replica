#!/usr/bin/env bash
# Start the Sonic Search Replica backend
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "node_modules missing. Run: npm install"
  exit 1
fi

exec node server.js
