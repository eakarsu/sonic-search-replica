const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { Client } = require('pg');
const request = require('supertest');

function wav(seconds = 1) {
  const sampleRate = 8000; const channels = 1; const bits = 16; const blockAlign = 2; const dataBytes = seconds * sampleRate * blockAlign;
  const buffer = Buffer.alloc(44 + dataBytes); buffer.write('RIFF', 0); buffer.writeUInt32LE(buffer.length - 8, 4); buffer.write('WAVE', 8);
  buffer.write('fmt ', 12); buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20); buffer.writeUInt16LE(channels, 22); buffer.writeUInt32LE(sampleRate, 24); buffer.writeUInt32LE(sampleRate * blockAlign, 28); buffer.writeUInt16LE(blockAlign, 32); buffer.writeUInt16LE(bits, 34); buffer.write('data', 36); buffer.writeUInt32LE(dataBytes, 40);
  return buffer;
}

const testDatabaseUrl = process.env.TEST_DATABASE_URL || '';
test('PostgreSQL media journey, isolation, migration controls, and failure recovery', { skip: !testDatabaseUrl }, async (t) => {
  const parsed = new URL(testDatabaseUrl);
  assert.match(parsed.pathname, /^\/sonic_media_test(?:_|$)/, 'integration tests require a disposable sonic_media_test database');
  const storageRoot = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'sonic-media-test-'));
  Object.assign(process.env, {
    DATABASE_URL: testDatabaseUrl, MEDIA_STORAGE_ROOT: storageRoot,
    JWT_SECRET: 'test-only-secret-with-more-than-thirty-two-characters', CORS_ORIGIN: 'http://127.0.0.1:5178',
    BACKEND_PORT: '3061', APP_HOST: '127.0.0.1', MAX_UPLOAD_BYTES: '32768', MAX_DURATION_SECONDS: '2', DAILY_UPLOAD_LIMIT: '20',
    DISABLE_MEDIA_WORKER: 'true', ALLOW_FIXTURE_SEED: 'YES', FIXTURE_PASSWORD: 'ValidFixturePass1234', NODE_ENV: 'test',
  });
  const bootstrap = new Client({ connectionString: testDatabaseUrl }); await bootstrap.connect();
  await bootstrap.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public'); await bootstrap.end();
  const { migrate, verifySchema } = require('../db/migrate'); const fixtures = require('../db/fixtures'); const pool = require('../db');
  const { app } = require('../server'); const { processJob } = require('../services/worker'); const storage = require('../services/storage');
  t.after(async () => { await pool.end(); await fs.promises.rm(storageRoot, { recursive: true, force: true }); });
  assert.equal((await migrate()).newlyApplied, 1); assert.equal((await migrate({ checkOnly: true })).pending, 0); await fixtures();

  const login = async (email) => (await request(app).post('/api/auth/login').send({ email, password: 'ValidFixturePass1234' }).expect(200)).body.token;
  const creator = await login('creator@example.test'); const reviewer = await login('reviewer@example.test'); const other = await login('other@example.test');
  const auth = (token) => ({ Authorization: `Bearer ${token}` });
  await request(app).get('/api/media/projects').expect(401);
  await request(app).get('/api/ai').set(auth(creator)).expect(404);
  await request(app).post('/api/media/projects').set(auth(creator)).field('title', 'Malformed').field('language', 'en').field('transcript', 'Text').attach('audio', Buffer.from('not wave'), 'bad.wav').expect(422);
  await request(app).post('/api/media/projects').set(auth(creator)).field('title', 'Bad language').field('language', '../../etc').field('transcript', 'Text').attach('audio', wav(), 'voice.wav').expect(422);
  await request(app).post('/api/media/projects').set(auth(creator)).field('title', 'Oversize').field('language', 'en').field('transcript', 'Text').attach('audio', Buffer.alloc(40000), 'large.wav').expect(413);

  const created = (await request(app).post('/api/media/projects').set(auth(creator)).field('title', 'Release narration').field('language', 'en-US').field('transcript', 'A human supplied transcript for the accessible release preview.').attach('audio', wav(), '../voice.wav').expect(202)).body;
  assert.equal(created.version.transcript_provenance, 'HUMAN_SUPPLIED');
  await request(app).get(`/api/media/projects/${created.project.id}`).set(auth(other)).expect(404);
  assert.deepEqual(await processJob(created.job.id), { processed: true, metadata: { sampleRateHz: 8000, channelCount: 1, bitDepth: 16, durationMs: 1000, dataBytes: 16000 } });
  let detail = (await request(app).get(`/api/media/projects/${created.project.id}`).set(auth(creator)).expect(200)).body;
  assert.equal(detail.versions[0].processing_state, 'READY'); assert.equal(detail.versions[0].job_status, 'SUCCEEDED');
  await request(app).get(`/api/media/versions/${created.version.id}/audio`).set(auth(creator)).expect('Content-Type', /audio\/wav/).expect(200);
  const ranged = await request(app).get(`/api/media/versions/${created.version.id}/audio`).set({ ...auth(creator), Range: 'bytes=0-9' }).expect(206); assert.equal(ranged.body.length, 10); assert.match(ranged.headers['content-range'], /^bytes 0-9\//);
  await request(app).get(`/api/media/versions/${created.version.id}/audio`).set({ ...auth(creator), Range: 'bytes=999999-' }).expect(416);
  const captions = await request(app).get(`/api/media/versions/${created.version.id}/captions`).set(auth(creator)).expect('Content-Type', /text\/vtt/).expect(200); assert.match(captions.text, /^WEBVTT/);
  await request(app).get(`/api/media/versions/${created.version.id}/export`).set(auth(creator)).expect(409);
  await request(app).post(`/api/media/versions/${created.version.id}/submit`).set(auth(creator)).expect(200);
  await request(app).post(`/api/media/versions/${created.version.id}/decision`).set(auth(creator)).send({ decision: 'APPROVED', reason: 'Creator must not approve this.' }).expect(403);
  await request(app).post(`/api/media/versions/${created.version.id}/decision`).set(auth(reviewer)).send({ decision: 'APPROVED', reason: 'Audio, captions, and transcript are aligned.' }).expect(200);
  const manifest = (await request(app).get(`/api/media/versions/${created.version.id}/export?preset=archive`).set(auth(creator)).expect(200)).body; assert.equal(manifest.preset, 'archive'); assert.equal(manifest.accessibility.captions, 'WebVTT');
  const audit = (await request(app).get(`/api/media/projects/${created.project.id}/audit`).set(auth(creator)).expect(200)).body; assert.equal(audit.chain.valid, true); assert.ok(audit.events.length >= 4); assert.doesNotMatch(JSON.stringify(audit.events), /human supplied transcript/i);
  await assert.rejects(pool.query("UPDATE media_audit_events SET action='TAMPERED' WHERE sequence=1"), /immutable/);
  await assert.rejects(pool.query("UPDATE media_versions SET transcript='changed' WHERE id=$1", [created.version.id]), /immutable/);

  const cancelled = (await request(app).post(`/api/media/projects/${created.project.id}/versions`).set(auth(creator)).field('title', 'Release narration').field('language', 'en-US').field('transcript', 'A replacement human transcript.').attach('audio', wav(), 'voice-v2.wav').expect(202)).body;
  await request(app).post(`/api/media/jobs/${cancelled.job.id}/cancel`).set(auth(creator)).expect(200);
  assert.equal((await request(app).get(`/api/media/jobs/${cancelled.job.id}`).set(auth(creator)).expect(200)).body.job.status, 'CANCELLED');

  const doomed = (await request(app).post('/api/media/projects').set(auth(creator)).field('title', 'Failure recovery').field('language', 'en').field('transcript', 'Failure path transcript.').attach('audio', wav(), 'failure.wav').expect(202)).body;
  await storage.remove(doomed.version.object_key); const failed = await processJob(doomed.job.id); assert.equal(failed.failed, true);
  let failedJob = (await request(app).get(`/api/media/jobs/${doomed.job.id}`).set(auth(creator)).expect(200)).body.job; assert.equal(failedJob.status, 'FAILED'); assert.equal(failedJob.error_code, 'PROCESSING_FAILED'); assert.doesNotMatch(failedJob.error_message, /sonic-media-test|\/tmp\//);
  await request(app).post(`/api/media/jobs/${doomed.job.id}/retry`).set(auth(creator)).expect(200); await request(app).post(`/api/media/jobs/${doomed.job.id}/cancel`).set(auth(creator)).expect(200);

  await pool.query('DROP INDEX media_jobs_status_idx'); await assert.rejects(verifySchema(pool), /media_jobs_status_idx/); await pool.query('CREATE INDEX media_jobs_status_idx ON media_jobs(status, created_at)'); await verifySchema(pool);
});
