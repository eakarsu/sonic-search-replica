import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('routine startup validates but never installs, migrates forward, or seeds', () => {
  const script = read('start.sh');
  assert.doesNotMatch(script, /npm\s+(?:install|ci)|CREATE DATABASE|\bpsql\b|\bfixtures\b|\bseed\b|db\/migrate\.js(?! --check)/);
  assert.match(script, /db\/migrate\.js --check/);
});

test('JWT verification and configuration fail closed', () => {
  const auth = read('backend/middleware/auth.js'); const config = read('backend/config.js');
  assert.doesNotMatch(auth, /dev-secret|default-secret|algorithm\s*:/);
  assert.match(auth, /algorithms:\['HS256'\]/); assert.match(auth, /issuer:config\.jwtIssuer/); assert.match(auth, /audience:config\.jwtAudience/);
  assert.match(config, /required\('JWT_SECRET', 32\)/); assert.match(config, /MEDIA_STORAGE_ROOT must be a specific directory outside the repository/);
});

test('server exposes only the bounded product API', () => {
  const server = read('backend/server.js');
  assert.match(server, /app\.use\('\/api\/auth'/); assert.match(server, /app\.use\('\/api\/media'/);
  for (const legacy of ['routes/ai', 'routes/ai-extras', 'routes/transcripts', 'routes/gap-features', 'routes/customViews']) assert.doesNotMatch(server, new RegExp(legacy));
  assert.match(server, /helmet/); assert.match(server, /express\.json\(\{ limit: '256kb'/); assert.match(server, /authLimiter/);
});

test('visible application is the persisted media workflow', () => {
  const app = read('src/App.tsx'); const workflow = read('src/pages/MediaWorkflow.tsx');
  assert.match(app, /MediaWorkflow/); assert.doesNotMatch(app, /AIPlayground|Gap|CustomViews|Transcripts/);
  for (const evidence of ['/api/media/projects', 'Human-supplied transcript', 'Accessible preview', 'Submit for review', 'Audit chain', 'Archive export manifest']) assert.match(workflow, new RegExp(evidence.replaceAll('/', '\\/')));
});

test('review progress uses the required dated heading', () => {
  const review = read('_COMPLETENESS_REVIEW.md');
  assert.equal((review.match(/^## Implementation progress \(2026-07-20\)$/gm) || []).length, 1);
  assert.doesNotMatch(review, /^## Implementation progress —/m);
});
