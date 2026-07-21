// Voice transcripts CRUD — persists user-supplied transcripts to the
// voice_transcripts table created by routes/ai.js so they can be retrieved
// later for review, redaction, or summarisation by the AI endpoints.

const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// Ensure the table exists even if /api/ai never loaded first (idempotent).
async function ensureTranscriptsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS voice_transcripts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      transcript TEXT NOT NULL,
      language VARCHAR(20),
      domain VARCHAR(50),
      confidence NUMERIC,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `).catch((err) => console.error('ensureTranscriptsTable:', err.message));
}

// POST /api/transcripts — save a transcript
router.post('/', auth, async (req, res) => {
  try {
    const { transcript, language, domain, confidence } = req.body || {};
    if (!transcript || typeof transcript !== 'string' || !transcript.trim()) {
      return res.status(400).json({ error: 'transcript (non-empty string) required' });
    }
    let conf = null;
    if (confidence !== undefined && confidence !== null && confidence !== '') {
      const n = Number(confidence);
      if (!Number.isFinite(n) || n < 0 || n > 1) {
        return res.status(400).json({ error: 'confidence must be a number between 0 and 1' });
      }
      conf = n;
    }
    const result = await pool.query(
      `INSERT INTO voice_transcripts (user_id, transcript, language, domain, confidence)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, transcript, language, domain, confidence, created_at`,
      [req.user.id, transcript, language || null, domain || null, conf]
    );
    res.json({ transcript: result.rows[0] });
  } catch (err) {
    console.error('POST /api/transcripts:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/transcripts — list current user's transcripts
router.get('/', auth, async (req, res) => {
  try {
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
    const result = await pool.query(
      `SELECT id, transcript, language, domain, confidence, created_at
       FROM voice_transcripts
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.user.id, limit, offset]
    );
    res.json({ transcripts: result.rows, count: result.rows.length, limit, offset });
  } catch (err) {
    console.error('GET /api/transcripts:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/transcripts/:id — fetch single transcript (owner only)
router.get('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'invalid id' });
    const result = await pool.query(
      `SELECT id, transcript, language, domain, confidence, created_at
       FROM voice_transcripts
       WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'not found' });
    res.json({ transcript: result.rows[0] });
  } catch (err) {
    console.error('GET /api/transcripts/:id:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/transcripts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'invalid id' });
    const result = await pool.query(
      `DELETE FROM voice_transcripts WHERE id = $1 AND user_id = $2 RETURNING id`,
      [id, req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'not found' });
    res.json({ id: result.rows[0].id, status: 'deleted' });
  } catch (err) {
    console.error('DELETE /api/transcripts/:id:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
