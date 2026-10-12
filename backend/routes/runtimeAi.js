'use strict';

const router = require('express').Router();
const auth = require('../middleware/auth');
const pool = require('../db');
const { requestMediaOperationsReadiness } = require('../services/openrouterEvidence');

router.get('/operations-readiness/history', auth, async (req, res, next) => {
  try {
    const saved = await pool.query(
      `SELECT id, created_at, input, provider_model, result_text
       FROM runtime_ai_results WHERE user_id = $1 AND feature = $2
       ORDER BY created_at DESC LIMIT 20`,
      [req.user.id, 'operations-readiness'],
    );
    return res.json({ results: saved.rows });
  } catch (error) { return next(error); }
});

router.post('/operations-readiness', auth, async (req, res, next) => {
  const workflowSummary = typeof req.body?.workflowSummary === 'string' ? req.body.workflowSummary.trim() : '';
  if (workflowSummary.length < 10 || workflowSummary.length > 1000) return res.status(422).json({ error: 'workflowSummary must contain 10-1000 characters', code: 'VALIDATION_ERROR' });
  const controller = new AbortController();
  const abort = () => controller.abort();
  const close = () => { if (!res.writableEnded) abort(); };
  req.once('aborted', abort); res.once('close', close);
  try {
    const evidence = await requestMediaOperationsReadiness(workflowSummary, undefined, { signal: controller.signal });
    controller.signal.throwIfAborted();
    const saved = await pool.query(
      `INSERT INTO runtime_ai_results
       (user_id,feature,input,provider_request_id,provider_model,result_text,provider_receipt)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,created_at`,
      [req.user.id, 'operations-readiness', { workflowSummary }, evidence.providerReceipt.requestId, evidence.providerReceipt.model, evidence.result, evidence.providerReceipt],
    );
    controller.signal.throwIfAborted();
    return res.json({ analysisId: saved.rows[0].id, createdAt: saved.rows[0].created_at, ...evidence });
  } catch (error) {
    if (controller.signal.aborted) return;
    if (error.name === 'TimeoutError') return res.status(504).json({ error: 'AI provider request timed out', code: 'AI_PROVIDER_TIMEOUT' });
    if (/^OPENROUTER_/.test(error.message || '')) return res.status(503).json({ error: 'AI provider is not configured', code: 'AI_NOT_CONFIGURED' });
    if (error.message?.startsWith('OpenRouter')) return res.status(502).json({ error: 'AI provider request failed', code: 'AI_PROVIDER_FAILED' });
    return next(error);
  } finally {
    req.off('aborted', abort); res.off('close', close);
  }
});

module.exports = router;
