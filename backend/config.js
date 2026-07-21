const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

function required(name, minimum = 1) {
  const value = String(process.env[name] || '').trim();
  if (value.length < minimum) throw new Error(`${name} must contain at least ${minimum} characters`);
  return value;
}
function integer(name, fallback, min, max) {
  const value = Number(process.env[name] || fallback);
  if (!Number.isInteger(value) || value < min || value > max) throw new Error(`${name} must be an integer from ${min} to ${max}`);
  return value;
}

const databaseUrl = required('DATABASE_URL');
if (!/^postgres(?:ql)?:\/\//.test(databaseUrl)) throw new Error('DATABASE_URL must use PostgreSQL');
const mediaStorageRoot = path.resolve(required('MEDIA_STORAGE_ROOT'));
const projectRoot = path.resolve(__dirname, '..');
if (mediaStorageRoot === '/' || mediaStorageRoot === projectRoot || mediaStorageRoot.startsWith(`${projectRoot}${path.sep}`)) throw new Error('MEDIA_STORAGE_ROOT must be a specific directory outside the repository');
const host = process.env.APP_HOST || '127.0.0.1';
if (!['127.0.0.1', '0.0.0.0'].includes(host)) throw new Error('APP_HOST must be 127.0.0.1 or 0.0.0.0');
const trustProxyValue = process.env.TRUST_PROXY || 'false';
if (!['true','false'].includes(trustProxyValue)) throw new Error('TRUST_PROXY must be true or false');

module.exports = {
  databaseUrl,
  jwtSecret: required('JWT_SECRET', 32),
  jwtIssuer: 'sonic-media-workflow',
  jwtAudience: 'sonic-media-web',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '30m',
  corsOrigin: required('CORS_ORIGIN'),
  host,
  port: integer('BACKEND_PORT', 3001, 1024, 65535),
  nodeEnv: process.env.NODE_ENV || 'development',
  mediaStorageRoot,
  maxUploadBytes: integer('MAX_UPLOAD_BYTES', 5242880, 1024, 52428800),
  maxDurationSeconds: integer('MAX_DURATION_SECONDS', 600, 1, 3600),
  dailyUploadLimit: integer('DAILY_UPLOAD_LIMIT', 20, 1, 1000),
  workerEnabled: process.env.DISABLE_MEDIA_WORKER !== 'true',
  frontendDirectory: process.env.FRONTEND_DIST || path.resolve(__dirname, '../dist'),
  trustProxy: trustProxyValue === 'true',
};
