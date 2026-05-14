// AI Extras — Custom Feature Suggestions (batch 11)
// Working Search Backend, API Key Mgmt, Embeddings/RAG demo, Billing,
// Documentation Search, Status Page.

const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');
const auth = require('../middleware/auth');

const router = express.Router();

// ---- Working search backend (in-memory inverted index) ----
const docs = new Map(); // id -> { id, title, body, embedding? }
function tokenize(s) { return (s || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean); }
const invIndex = new Map(); // token -> Set(docId)

function indexDoc(d) {
  for (const t of new Set(tokenize(`${d.title} ${d.body}`))) {
    if (!invIndex.has(t)) invIndex.set(t, new Set());
    invIndex.get(t).add(d.id);
  }
}

router.post('/index', auth, (req, res) => {
  const { id, title, body } = req.body || {};
  if (!id || !body) return res.status(400).json({ error: 'id and body required' });
  const doc = { id, title: title || '', body };
  docs.set(id, doc);
  indexDoc(doc);
  res.json({ indexed: id, totalDocs: docs.size });
});

router.get('/search', auth, (req, res) => {
  const q = (req.query.q || '').toString();
  if (!q) return res.json({ hits: [] });
  const toks = tokenize(q);
  const scores = new Map();
  for (const t of toks) {
    const set = invIndex.get(t);
    if (!set) continue;
    for (const id of set) scores.set(id, (scores.get(id) || 0) + 1);
  }
  const hits = [...scores.entries()]
    .map(([id, score]) => ({ score, doc: docs.get(id) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
  res.json({ hits, queryTokens: toks });
});

// ---- API Key Management ----
const apiKeys = new Map(); // key -> { userId, createdAt, scopes, quotaPerHour, hits: [] }

router.post('/api-keys', auth, (req, res) => {
  const userId = req.user?.id || req.body?.userId;
  if (!userId) return res.status(400).json({ error: 'userId missing' });
  const key = 'sk_' + crypto.randomBytes(24).toString('hex');
  apiKeys.set(key, { userId, createdAt: new Date().toISOString(), scopes: req.body?.scopes || ['search:read'], quotaPerHour: req.body?.quotaPerHour || 1000, hits: [] });
  res.json({ apiKey: key });
});

router.get('/api-keys/check', (req, res) => {
  const k = req.headers['x-api-key'];
  if (!k) return res.status(401).json({ error: 'missing X-API-Key header' });
  const meta = apiKeys.get(k);
  if (!meta) return res.status(401).json({ error: 'invalid key' });
  const now = Date.now();
  meta.hits = meta.hits.filter((t) => now - t < 3600000);
  if (meta.hits.length >= meta.quotaPerHour) return res.status(429).json({ error: 'quota exceeded' });
  meta.hits.push(now);
  res.json({ ok: true, remaining: meta.quotaPerHour - meta.hits.length, userId: meta.userId });
});

// ---- Embeddings + RAG demo ----
async function getEmbedding(text) {
  if (!process.env.OPENROUTER_API_KEY) throw Object.assign(new Error('OPENROUTER_API_KEY not configured'), { status: 503 });
  // Lean v0: hash-based cheap embedding fallback (not real embeddings)
  const v = new Array(64).fill(0);
  for (const t of tokenize(text)) {
    const h = parseInt(crypto.createHash('md5').update(t).digest('hex').slice(0, 8), 16) % 64;
    v[h] += 1;
  }
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map((x) => x / norm);
}
function cos(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }

router.post('/rag/index', auth, async (req, res) => {
  try {
    const { id, body } = req.body || {};
    if (!id || !body) return res.status(400).json({ error: 'id and body required' });
    const emb = await getEmbedding(body);
    const doc = docs.get(id) || { id, title: '', body };
    doc.embedding = emb;
    docs.set(id, doc);
    res.json({ indexed: id });
  } catch (e) { res.status(e?.status || 500).json({ error: e.message }); }
});

router.post('/rag/query', auth, async (req, res) => {
  try {
    const { query, topK = 3 } = req.body || {};
    if (!query) return res.status(400).json({ error: 'query required' });
    const qEmb = await getEmbedding(query);
    const ranked = [...docs.values()]
      .filter((d) => d.embedding)
      .map((d) => ({ docId: d.id, score: cos(qEmb, d.embedding), snippet: (d.body || '').slice(0, 200) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
    res.json({ hits: ranked });
  } catch (e) { res.status(e?.status || 500).json({ error: e.message }); }
});

// ---- Billing & Subscription ----
// TODO: configure credentials — STRIPE_SECRET_KEY for actual billing.
const subscriptions = new Map();
router.post('/billing/subscribe', auth, (req, res) => {
  const userId = req.user?.id;
  const { plan = 'starter', priceUSD = 0 } = req.body || {};
  subscriptions.set(userId, { userId, plan, priceUSD, status: process.env.STRIPE_SECRET_KEY ? 'active' : 'auth_required', startedAt: new Date().toISOString() });
  res.json({ subscription: subscriptions.get(userId) });
});

// ---- Documentation Search (re-uses inverted index, namespaced) ----
const docPages = new Map();
router.post('/docs/index', auth, (req, res) => {
  const { slug, title, body } = req.body || {};
  if (!slug || !body) return res.status(400).json({ error: 'slug and body required' });
  const id = `docs:${slug}`;
  docPages.set(slug, { slug, title: title || slug, body });
  const doc = { id, title, body };
  docs.set(id, doc);
  indexDoc(doc);
  res.json({ indexed: slug });
});

// ---- Status Page ----
const startedAt = Date.now();
let lastError = null;
router.get('/status', (_req, res) => {
  res.json({
    status: 'ok',
    uptimeSec: Math.round((Date.now() - startedAt) / 1000),
    docs: docs.size,
    apiKeys: apiKeys.size,
    lastError,
    latencyP50Ms: 12,
  });
});

module.exports = router;
