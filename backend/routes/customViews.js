// Custom Views for sonic-search-replica (voice / sonic search domain)
// Provides 4 endpoints:
//   GET  /api/custom-views/query-latency      (VIZ)   - per-day p50/p95/p99 latency for recent voice queries
//   GET  /api/custom-views/query-type-heatmap (VIZ)   - audio query type x hour-of-day heatmap
//   GET  /api/custom-views/query-history-pdf  (NONVIZ)- printable PDF (plain text/pdf bytes) of query history
//   *    /api/custom-views/voice-tuning-rules (NONVIZ)- CRUD over voice tuning rules
//
// All endpoints are unauthenticated demo endpoints so they can be probed
// directly and rendered in the dashboard without a login.  Data is deterministic
// / in-memory; no external services are required.

const express = require('express');
const router = express.Router();

// ---------- helpers ----------
function seedRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }
function dayKey(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
}

// ---------- 1. Query Latency Timeline (VIZ) ----------
router.get('/query-latency', (req, res) => {
  try {
    const days = Math.min(60, Math.max(7, parseInt(req.query.days, 10) || 14));
    const rng = seedRandom(20260518);
    const series = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000);
      const base = 180 + rng() * 70; // ms
      const p50 = Math.round(base);
      const p95 = Math.round(base + 120 + rng() * 90);
      const p99 = Math.round(p95 + 60 + rng() * 90);
      const queries = Math.round(800 + rng() * 1800);
      series.push({ date: dayKey(d), p50, p95, p99, queries });
    }
    const avgP50 = Math.round(series.reduce((a, x) => a + x.p50, 0) / series.length);
    const avgP95 = Math.round(series.reduce((a, x) => a + x.p95, 0) / series.length);
    const avgP99 = Math.round(series.reduce((a, x) => a + x.p99, 0) / series.length);
    res.json({
      domain: 'voice-search-latency',
      unit: 'ms',
      days,
      series,
      summary: { avgP50, avgP95, avgP99, samples: series.length },
    });
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed' });
  }
});

// ---------- 2. Audio Query Type Heatmap (VIZ) ----------
router.get('/query-type-heatmap', (req, res) => {
  try {
    const types = ['wake-word', 'voice-command', 'voice-search', 'dictation', 'voice-chat', 'in-car-asr'];
    const rng = seedRandom(7777);
    const cells = [];
    for (const t of types) {
      const row = [];
      for (let h = 0; h < 24; h++) {
        // bump during waking hours
        const dayBoost = h >= 7 && h <= 22 ? 1.6 : 0.4;
        const v = Math.round((10 + rng() * 90) * dayBoost);
        row.push(v);
      }
      cells.push({ type: t, hours: row, total: row.reduce((a, x) => a + x, 0) });
    }
    res.json({
      domain: 'audio-query-type-by-hour',
      xAxis: 'hour-of-day-utc',
      yAxis: 'audio-query-type',
      types,
      hours: Array.from({ length: 24 }, (_, i) => i),
      cells,
    });
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed' });
  }
});

// ---------- 3. Query History PDF (NON-VIZ) ----------
router.get('/query-history-pdf', (req, res) => {
  try {
    const limit = Math.min(50, Math.max(5, parseInt(req.query.limit, 10) || 20));
    const samples = [
      'play some jazz in the living room',
      'what is the weather in tokyo tomorrow',
      'find italian restaurants near me',
      'set a timer for 25 minutes',
      'navigate to the nearest gas station',
      'who won the world cup in 2022',
      'translate good morning into french',
      'turn off the bedroom lights',
      'how tall is mount everest',
      'send a message to alex saying running late',
    ];
    const rng = seedRandom(424242);
    const rows = [];
    for (let i = 0; i < limit; i++) {
      const t = samples[Math.floor(rng() * samples.length)];
      const latency = Math.round(140 + rng() * 380);
      const conf = (0.6 + rng() * 0.39).toFixed(2);
      const ago = i + 1;
      rows.push({ idx: i + 1, query: t, latencyMs: latency, confidence: conf, minutesAgo: ago });
    }

    // Build a minimal valid PDF by hand (no external deps).
    const lines = [];
    lines.push('Sonic Search Replica - Voice Query History');
    lines.push('Generated: ' + new Date().toISOString());
    lines.push('Total rows: ' + rows.length);
    lines.push('');
    for (const r of rows) {
      lines.push(String(r.idx).padStart(2, ' ') + '. [' + r.latencyMs + 'ms / conf ' + r.confidence + '] ' + r.query);
    }

    // build content stream
    let stream = 'BT /F1 11 Tf 36 760 Td 14 TL\n';
    for (let i = 0; i < lines.length; i++) {
      const safe = lines[i].replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      if (i === 0) {
        stream += '(' + safe + ') Tj\n';
      } else {
        stream += 'T* (' + safe + ') Tj\n';
      }
    }
    stream += 'ET';

    const objs = [];
    objs.push('<< /Type /Catalog /Pages 2 0 R >>');
    objs.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    objs.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>');
    objs.push('<< /Length ' + Buffer.byteLength(stream) + ' >>\nstream\n' + stream + '\nendstream');
    objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');

    let pdf = '%PDF-1.4\n';
    const offsets = [];
    for (let i = 0; i < objs.length; i++) {
      offsets.push(Buffer.byteLength(pdf));
      pdf += (i + 1) + ' 0 obj\n' + objs[i] + '\nendobj\n';
    }
    const xrefStart = Buffer.byteLength(pdf);
    pdf += 'xref\n0 ' + (objs.length + 1) + '\n';
    pdf += '0000000000 65535 f \n';
    for (const off of offsets) {
      pdf += String(off).padStart(10, '0') + ' 00000 n \n';
    }
    pdf += 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefStart + '\n%%EOF';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="voice-query-history.pdf"');
    res.send(Buffer.from(pdf, 'binary'));
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed' });
  }
});

// ---------- 4. Voice Tuning Rules CRUD (NON-VIZ) ----------
const tuningRules = new Map();
let tuningSeq = 0;
// seed
function seedTuning() {
  const seed = [
    { name: 'Boost wake-word "hey hound"', kind: 'wake-word', priority: 10, expression: 'phrase == "hey hound"', enabled: true, action: 'boost(1.4)' },
    { name: 'Suppress TV background asr', kind: 'denoise', priority: 5, expression: 'context.device == "tv"', enabled: true, action: 'noise_floor(-8db)' },
    { name: 'Rewrite "play youtube" -> "open youtube"', kind: 'rewrite', priority: 7, expression: 'startswith("play youtube")', enabled: true, action: 'rewrite("open youtube")' },
  ];
  for (const r of seed) {
    tuningSeq += 1;
    const id = 'rule_' + tuningSeq;
    tuningRules.set(id, { id, createdAt: new Date().toISOString(), ...r });
  }
}
seedTuning();

function validateRule(body, partial) {
  const errs = [];
  if (!partial || 'name' in body) { if (!body.name || typeof body.name !== 'string') errs.push('name (string) required'); }
  if (!partial || 'kind' in body) {
    const allowed = ['wake-word', 'denoise', 'rewrite', 'intent', 'asr-bias'];
    if (!partial && !allowed.includes(body.kind)) errs.push('kind must be one of ' + allowed.join(','));
    if (partial && 'kind' in body && !allowed.includes(body.kind)) errs.push('kind must be one of ' + allowed.join(','));
  }
  if (!partial || 'priority' in body) {
    const p = body.priority;
    if (p !== undefined && (typeof p !== 'number' || p < 0 || p > 100)) errs.push('priority must be number 0..100');
  }
  return errs;
}

router.get('/voice-tuning-rules', (req, res) => {
  const rules = Array.from(tuningRules.values()).sort((a, b) => (b.priority || 0) - (a.priority || 0));
  res.json({ rules, count: rules.length });
});

router.post('/voice-tuning-rules', (req, res) => {
  const body = req.body || {};
  const errs = validateRule(body, false);
  if (errs.length) return res.status(400).json({ error: errs.join('; ') });
  tuningSeq += 1;
  const id = 'rule_' + tuningSeq;
  const rule = {
    id,
    name: body.name,
    kind: body.kind,
    priority: typeof body.priority === 'number' ? body.priority : 5,
    expression: body.expression || '',
    action: body.action || '',
    enabled: body.enabled !== false,
    createdAt: new Date().toISOString(),
  };
  tuningRules.set(id, rule);
  res.json({ rule, status: 'created' });
});

router.put('/voice-tuning-rules/:id', (req, res) => {
  const id = req.params.id;
  const existing = tuningRules.get(id);
  if (!existing) return res.status(404).json({ error: 'rule not found' });
  const body = req.body || {};
  const errs = validateRule(body, true);
  if (errs.length) return res.status(400).json({ error: errs.join('; ') });
  const updated = { ...existing, ...body, id, updatedAt: new Date().toISOString() };
  tuningRules.set(id, updated);
  res.json({ rule: updated, status: 'updated' });
});

router.delete('/voice-tuning-rules/:id', (req, res) => {
  const id = req.params.id;
  if (!tuningRules.has(id)) return res.status(404).json({ error: 'rule not found' });
  tuningRules.delete(id);
  res.json({ id, status: 'deleted' });
});

module.exports = router;
