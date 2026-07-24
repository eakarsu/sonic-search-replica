'use strict';

const router = require('express').Router();
const auth = require('../middleware/auth');
const pool = require('../db');
const { requestMediaOperationsReadiness } = require('../services/openrouterEvidence');

router.post('/operations-readiness', auth, async (req, res, next) => {
  const workflowSummary = typeof req.body?.workflowSummary === 'string' ? req.body.workflowSummary.trim() : '';
  if (workflowSummary.length < 10 || workflowSummary.length > 1000) return res.status(422).json({ error: 'workflowSummary must contain 10-1000 characters', code: 'VALIDATION_ERROR' });
  try {
    const evidence = await requestMediaOperationsReadiness(workflowSummary);
    const saved = await pool.query(
      `INSERT INTO runtime_ai_results
       (user_id,feature,input,provider_request_id,provider_model,result_text,provider_receipt)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,created_at`,
      [req.user.id, 'operations-readiness', { workflowSummary }, evidence.providerReceipt.requestId, evidence.providerReceipt.model, evidence.result, evidence.providerReceipt],
    );
    return res.json({ analysisId: saved.rows[0].id, createdAt: saved.rows[0].created_at, ...evidence });
  } catch (error) {
    if (error.message?.startsWith('OpenRouter')) return res.status(502).json({ error: 'AI provider request failed', code: 'AI_PROVIDER_FAILED' });
    return next(error);
  }
});

module.exports = router;
