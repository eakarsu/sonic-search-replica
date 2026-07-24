const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const config = require('./config');
const pool = require('./db');
const storage = require('./services/storage');
const { startWorker, stopWorker } = require('./services/worker');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', config.trustProxy);
app.use((req, res, next) => {
  const supplied = req.get('x-request-id');
  req.requestId = supplied && /^[A-Za-z0-9._:-]{1,100}$/.test(supplied) ? supplied : crypto.randomUUID();
  res.set('X-Request-Id', req.requestId);
  const started = Date.now();
  res.on('finish', () => console.log(JSON.stringify({
    level: 'info', event: 'http_request', requestId: req.requestId,
    method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - started,
  })));
  next();
});
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      mediaSrc: ["'self'", 'blob:'],
      connectSrc: ["'self'", config.corsOrigin],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginResourcePolicy: { policy: 'same-origin' },
}));
app.use(cors({ origin: config.corsOrigin, methods: ['GET', 'POST'], allowedHeaders: ['Authorization', 'Content-Type', 'Range', 'X-Request-Id'], exposedHeaders: ['Content-Range', 'Accept-Ranges', 'X-Request-Id'], credentials: false, maxAge: 600 }));
app.use(express.json({ limit: '256kb', strict: true }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts', code: 'AUTH_RATE_LIMIT' },
});
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/media', require('./routes/media'));
app.use('/api/runtime-ai', require('./routes/runtimeAi'));
app.get('/api/health/live', (req, res) => res.json({ status: 'live' }));
app.get('/api/health/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    await fs.promises.access(config.mediaStorageRoot, fs.constants.R_OK | fs.constants.W_OK);
    res.json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not_ready', code: 'DEPENDENCY_UNAVAILABLE' });
  }
});
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found', code: 'NOT_FOUND' }));

if (fs.existsSync(path.join(config.frontendDirectory, 'index.html'))) {
  app.use(express.static(config.frontendDirectory, { index: false, fallthrough: true, maxAge: config.nodeEnv === 'production' ? '1h' : 0 }));
  app.get('*', (req, res, next) => req.method === 'GET'
    ? res.set('Cache-Control', 'no-cache').sendFile(path.join(config.frontendDirectory, 'index.html'))
    : next());
}

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = Number.isInteger(err.status) && err.status >= 400 && err.status <= 599 ? err.status : 500;
  const code = status < 500 && typeof err.code === 'string' ? err.code : 'INTERNAL_ERROR';
  if (status >= 500) console.error(JSON.stringify({ level: 'error', event: 'request_failed', requestId: req.requestId, code, message: err.message }));
  return res.status(status).set('Cache-Control', 'no-store').json({
    error: status < 500 ? err.message : 'Internal server error', code, requestId: req.requestId,
  });
});

let server;
async function start() {
  await storage.ensureRoot();
  await pool.query('SELECT 1');
  await startWorker();
  server = app.listen(config.port, config.host, () => console.log(JSON.stringify({ level: 'info', event: 'server_started', host: config.host, port: config.port })));
  return server;
}
async function shutdown(signal) {
  console.log(JSON.stringify({ level: 'info', event: 'shutdown', signal }));
  stopWorker();
  if (server) await new Promise((resolve) => server.close(resolve));
  await pool.end();
}

if (require.main === module) {
  start().catch((error) => { console.error(JSON.stringify({ level: 'error', event: 'startup_failed', message: error.message })); process.exitCode = 1; });
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => shutdown(signal).then(() => process.exit(0)).catch(() => process.exit(1)));
}

module.exports = { app, start, shutdown };
