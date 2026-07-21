const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const pool = require('../db');

const directory = path.join(__dirname, 'migrations');
const expectedRelations = ['users','media_projects','media_versions','media_jobs','media_audit_events'];

async function verifySchema(client) {
  const missing = [];
  for (const relation of expectedRelations) {
    if (!(await client.query('SELECT to_regclass($1) AS relation', [`public.${relation}`])).rows[0].relation) missing.push(relation);
  }
  const columns = await client.query(`SELECT table_name,column_name FROM information_schema.columns WHERE table_schema='public' AND (table_name,column_name) IN (('users','password_hash'),('users','role'),('media_versions','object_key'),('media_versions','captions_key'),('media_versions','review_state'),('media_jobs','cancellation_requested'))`);
  const available = new Set(columns.rows.map((row) => `${row.table_name}.${row.column_name}`));
  const expectedColumns = ['users.password_hash','users.role','media_versions.object_key','media_versions.captions_key','media_versions.review_state','media_jobs.cancellation_requested'];
  missing.push(...expectedColumns.filter((column) => !available.has(column)));
  const controls = (await client.query(`SELECT
    EXISTS(SELECT 1 FROM pg_trigger WHERE tgname='media_audit_immutable' AND NOT tgisinternal) audit_trigger,
    EXISTS(SELECT 1 FROM pg_trigger WHERE tgname='media_version_review_guard' AND NOT tgisinternal) review_trigger,
    to_regclass('public.media_jobs_status_idx') IS NOT NULL jobs_index`)).rows[0];
  if (!controls.audit_trigger) missing.push('media_audit_immutable');
  if (!controls.review_trigger) missing.push('media_version_review_guard');
  if (!controls.jobs_index) missing.push('media_jobs_status_idx');
  if (missing.length) throw new Error(`Schema drift detected: ${missing.join(', ')}`);
  return { relations: expectedRelations.length, columns: expectedColumns.length, controls: 3 };
}

async function migrate({ checkOnly = false } = {}) {
  const client = await pool.connect(); let locked = false;
  try {
    await client.query('SELECT pg_advisory_lock(7320260720)'); locked = true;
    const tracking = (await client.query("SELECT to_regclass('public.schema_migrations') relation")).rows[0].relation;
    if (checkOnly && !tracking) throw new Error('schema_migrations is missing; run migrations explicitly');
    if (!tracking) await client.query('CREATE TABLE schema_migrations(name TEXT PRIMARY KEY,checksum CHAR(64) NOT NULL,applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');
    const files = fs.readdirSync(directory).filter((name) => /^\d+.*\.sql$/.test(name)).sort();
    const applied = new Map((await client.query('SELECT name,checksum FROM schema_migrations')).rows.map((row) => [row.name,row.checksum]));
    const pending = [];
    for (const name of files) {
      const sql = fs.readFileSync(path.join(directory,name),'utf8'); const checksum = crypto.createHash('sha256').update(sql).digest('hex');
      if (applied.has(name) && applied.get(name) !== checksum) throw new Error(`Applied migration checksum mismatch: ${name}`);
      if (!applied.has(name)) pending.push({ name,sql,checksum });
    }
    if (checkOnly && pending.length) throw new Error(`Pending migrations: ${pending.map((item)=>item.name).join(', ')}`);
    for (const item of checkOnly ? [] : pending) {
      await client.query('BEGIN');
      try { await client.query(item.sql); await client.query('INSERT INTO schema_migrations(name,checksum) VALUES($1,$2)',[item.name,item.checksum]); await client.query('COMMIT'); }
      catch (error) { await client.query('ROLLBACK'); throw error; }
    }
    return { files: files.length, newlyApplied: checkOnly ? 0 : pending.length, pending: checkOnly ? pending.length : 0, verified: await verifySchema(client) };
  } finally { if (locked) await client.query('SELECT pg_advisory_unlock(7320260720)').catch(()=>{}); client.release(); }
}

if (require.main===module) migrate({ checkOnly: process.argv.includes('--check') }).then((result)=>console.log(`Migration status: ${JSON.stringify(result)}`)).catch((error)=>{console.error(error.message);process.exitCode=1;}).finally(()=>pool.end());
module.exports={migrate,verifySchema};
