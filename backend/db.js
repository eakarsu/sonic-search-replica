const { Pool } = require('pg');

const databaseUrl = String(process.env.DATABASE_URL || '').trim();
if (!/^postgres(?:ql)?:\/\//.test(databaseUrl)) {
  throw new Error('DATABASE_URL must use PostgreSQL');
}

const max = Number(process.env.DB_POOL_MAX || 10);
if (!Number.isInteger(max) || max < 1 || max > 50) throw new Error('DB_POOL_MAX must be an integer from 1 to 50');

const pool = new Pool({ connectionString: databaseUrl, max, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000, statement_timeout: 15000 });
pool.on('error', (error) => console.error(JSON.stringify({ level: 'error', event: 'idle_database_error', message: error.message })));
module.exports = pool;
