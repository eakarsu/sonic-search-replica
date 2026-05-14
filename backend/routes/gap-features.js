// === Batch 11 Gaps & Frontend Mounts ===
// Gap features (AI counterparts + Non-AI features) for sonic-search-replica.
// Lazy gap_features table (in-memory), OpenRouter via native fetch.

const express = require('express');
const router = express.Router();

const gapFeatures = new Map();

async function llm(systemPrompt, userMsg, maxTokens = 1400) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { const e = new Error('OPENROUTER_API_KEY not configured'); e.status = 503; throw e; }
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4.5';
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json', 'HTTP-Referer': 'http://localhost:3000', 'X-Title': 'sonic-search-replica Gap Features' },
    body: JSON.stringify({ model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMsg }], max_tokens: maxTokens }),
  });
  const data = await r.json();
  if (data && data.error) throw new Error(data.error.message || 'LLM error');
  return (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
}

function track(slug, payload) {
  const list = gapFeatures.get(slug) || [];
  list.push({ at: new Date().toISOString(), payload });
  gapFeatures.set(slug, list);
}

function safe(res, e) { return res.status((e && e.status) || 500).json({ error: (e && e.message) || 'request failed' }); }

// ---- AI Gap Counterparts ----

router.post('/gap-semantic-search', async (req, res) => {
  try {
    const body = req.body || {};
    const sys = "You demonstrate semantic search with embeddings; given a query and corpus, return ranked matches with similarity scores.";
    const user = `Body: ${JSON.stringify(body).slice(0, 4000)}`;
    const out = await llm(sys, user);
    track('semantic-search', { keys: Object.keys(body) });
    res.json({ results: out });
  } catch (e) { safe(res, e); }
});

router.post('/gap-agentic-playground', async (req, res) => {
  try {
    const body = req.body || {};
    const sys = "You run multi-step reasoning over user prompts and tools.";
    const user = `Body: ${JSON.stringify(body).slice(0, 4000)}`;
    const out = await llm(sys, user);
    track('agentic-playground', { keys: Object.keys(body) });
    res.json({ reasoning: out });
  } catch (e) { safe(res, e); }
});

router.post('/gap-prompt-library', async (req, res) => {
  try {
    const body = req.body || {};
    const sys = "You curate prompt templates by category and use case.";
    const user = `Body: ${JSON.stringify(body).slice(0, 4000)}`;
    const out = await llm(sys, user);
    track('prompt-library', { keys: Object.keys(body) });
    res.json({ templates: out });
  } catch (e) { safe(res, e); }
});

// ---- Non-AI Gap Features ----

router.post('/gap-search-backend', (req, res) => {
  const body = req.body || {};
  const record = { id: 'search-backend_' + Date.now(), ...body, createdAt: new Date().toISOString() };
  track('search-backend', record);
  res.json({ job: record, status: 'recorded' });
});

router.post('/gap-api-key-management', (req, res) => {
  const body = req.body || {};
  const record = { id: 'api-key-management_' + Date.now(), ...body, createdAt: new Date().toISOString() };
  track('api-key-management', record);
  res.json({ key: record, status: 'recorded' });
});

router.post('/gap-usage-analytics', (req, res) => {
  const body = req.body || {};
  const record = { id: 'usage-analytics_' + Date.now(), ...body, createdAt: new Date().toISOString() };
  track('usage-analytics', record);
  res.json({ metric: record, status: 'recorded' });
});

router.post('/gap-billing-subscription', (req, res) => {
  const body = req.body || {};
  const record = { id: 'billing-subscription_' + Date.now(), ...body, createdAt: new Date().toISOString() };
  track('billing-subscription', record);
  res.json({ subscription: record, status: 'recorded' });
});

router.post('/gap-docs-search', (req, res) => {
  const body = req.body || {};
  const record = { id: 'docs-search_' + Date.now(), ...body, createdAt: new Date().toISOString() };
  track('docs-search', record);
  res.json({ results: record, status: 'recorded' });
});

router.post('/gap-status-page', (req, res) => {
  const body = req.body || {};
  const record = { id: 'status-page_' + Date.now(), ...body, createdAt: new Date().toISOString() };
  track('status-page', record);
  res.json({ status: record, status: 'recorded' });
});

router.get('/gap-features/_audit', (req, res) => {
  const rows = [];
  for (const [k, v] of gapFeatures.entries()) rows.push({ feature: k, events: v.length });
  res.json({ rows });
});

module.exports = router;
