const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/extras', require('./routes/ai-extras'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Custom Views (mounted BEFORE 404/global error handler)
app.use('/api/custom-views', require('./routes/customViews'));

// Voice transcripts CRUD (apply pass 7)
app.use('/api/transcripts', require('./routes/transcripts'));

app.use('/api', require('./routes/gap-features')); // === Batch 11 Gaps & Frontend Mounts ===

// 404 (must come after all routes)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.statusCode || 500).json({
    error: err.message || 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Sonic Search Replica backend running on port ${PORT}`);
});
