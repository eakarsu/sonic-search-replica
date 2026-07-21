const express = require('express');
const fetch = require('node-fetch');
const auth = require('../middleware/auth');
const pool = require('../db');
const router = express.Router();

// ---------------------------------------------------------------------------
// OpenRouter helper – persists every result to ai_results table
// ---------------------------------------------------------------------------
async function callOpenRouter(prompt, systemPrompt, model) {
  const chosenModel = model || process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4.5';
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Sonic Search Replica',
    },
    body: JSON.stringify({
      model: chosenModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      max_tokens: 3000,
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message || 'OpenRouter API error');
  return {
    content: data.choices[0].message.content,
    model: chosenModel,
    tokens: data.usage?.total_tokens || null,
  };
}

async function persistResult(userId, endpoint, params, result) {
  try {
    await pool.query(
      `INSERT INTO ai_results (user_id, endpoint, request_params, result_text, model_used, tokens_used)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, endpoint, JSON.stringify(params), result.content, result.model, result.tokens]
    );
  } catch (err) {
    console.error('Failed to persist AI result:', err.message);
  }
}

async function ensureAiTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_results (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      endpoint VARCHAR(100) NOT NULL,
      request_params JSONB,
      result_text TEXT NOT NULL,
      model_used VARCHAR(100),
      tokens_used INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS voice_transcripts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      transcript TEXT NOT NULL,
      language VARCHAR(20),
      domain VARCHAR(50),
      confidence NUMERIC,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS custom_domains (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      name VARCHAR(100) NOT NULL,
      sample_phrases TEXT,
      entities JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `).catch(err => console.error('ensureAiTables:', err.message));
}


// ---------------------------------------------------------------------------
// GET /api/ai/history
// ---------------------------------------------------------------------------
router.get('/history', auth, async (req, res) => {
  try {
    const { endpoint, limit = 20, offset = 0 } = req.query;
    let query = `SELECT id, endpoint, request_params, result_text, model_used, tokens_used, created_at
                 FROM ai_results WHERE user_id = $1`;
    const params = [req.user.id];
    if (endpoint) {
      params.push(endpoint);
      query += ` AND endpoint = $${params.length}`;
    }
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const result = await pool.query(query, params);
    res.json({ results: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/intent-classify
// Classify the spoken intent: search | command | question | navigation | transaction
// ---------------------------------------------------------------------------
router.post('/intent-classify', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { transcript, language, domain } = req.body;
    if (!transcript) return res.status(400).json({ error: 'transcript required' });

    const prompt = `
Classify the user intent for this voice transcript. The platform is a voice-AI / voice-search assistant similar to Houndify.

TRANSCRIPT: "${transcript}"
LANGUAGE: ${language || 'en-US'}
DEPLOYMENT DOMAIN: ${domain || 'general'}

Return strict JSON:
{
  "primary_intent": "search|command|question|navigation|transaction|smalltalk|unknown",
  "secondary_intents": ["..."],
  "confidence": 0.0-1.0,
  "actionable": true|false,
  "needs_clarification": true|false,
  "clarifying_question": "string or null",
  "reasoning": "brief"
}`;
    const systemPrompt = `You are a voice-AI intent classifier. Output strict JSON only.
Optimise for low-latency assistant responses on automotive, smart-home, and mobile-app surfaces.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'intent-classify', { transcript, language, domain }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/entity-extract
// Extract slots/entities for downstream skill execution
// ---------------------------------------------------------------------------
router.post('/entity-extract', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { transcript, expectedEntities } = req.body;
    if (!transcript) return res.status(400).json({ error: 'transcript required' });

    const prompt = `
Extract structured entities from this voice transcript.

TRANSCRIPT: "${transcript}"
EXPECTED ENTITY TYPES: ${(expectedEntities && expectedEntities.join(', ')) || 'auto-detect'}

Return strict JSON listing every entity found:
{
  "entities": [
    { "type": "person|location|datetime|number|currency|product|brand|domain_specific",
      "value": "string",
      "normalized": "ISO-8601 / canonical form when applicable",
      "span_start": int,
      "span_end": int,
      "confidence": 0.0-1.0
    }
  ],
  "ambiguities": ["..."]
}`;
    const systemPrompt = `You are a voice-NLU entity extractor. Output strict JSON only.
Resolve relative dates ("tomorrow", "next Friday") to ISO-8601 using NOW=${new Date().toISOString()}.
Normalise currencies, units, and product references to canonical forms.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'entity-extract', { transcript }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/asr-correct
// Correct ASR (speech-to-text) errors using language-model context
// ---------------------------------------------------------------------------
router.post('/asr-correct', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { rawTranscript, alternativeHypotheses, domain } = req.body;
    if (!rawTranscript) return res.status(400).json({ error: 'rawTranscript required' });

    const prompt = `
Correct likely ASR errors in this raw speech-to-text output.

RAW TRANSCRIPT: "${rawTranscript}"
ALTERNATIVE HYPOTHESES (n-best from ASR engine): ${alternativeHypotheses ? JSON.stringify(alternativeHypotheses) : 'none provided'}
DOMAIN HINT: ${domain || 'general'}

Provide:
1. Most likely corrected transcript
2. List of corrections made (raw -> corrected with reason)
3. Confidence score 0.0-1.0
4. Words that remain ambiguous

Return strict JSON.`;
    const systemPrompt = `You are an ASR post-processor. Fix homophones, punctuation, capitalization,
and domain-specific terminology. Preserve the speaker's meaning. Output strict JSON.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'asr-correct', { rawTranscript, domain }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/voice-search-rewrite
// Rewrite a spoken query into an optimised text-search query
// ---------------------------------------------------------------------------
router.post('/voice-search-rewrite', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { spokenQuery, searchDomain, locale } = req.body;
    if (!spokenQuery) return res.status(400).json({ error: 'spokenQuery required' });

    const prompt = `
Rewrite this spoken voice query into an optimised search engine query.

SPOKEN QUERY: "${spokenQuery}"
SEARCH DOMAIN: ${searchDomain || 'web'} (web | ecommerce | media | knowledge_base | maps)
LOCALE: ${locale || 'en-US'}

Tasks:
1. Strip filler words ("um", "uh", "like", "you know")
2. Resolve referents and pronouns
3. Add likely synonyms / expansions
4. Produce a short keyword query AND a natural-language reformulation
5. Suggest 3 query refinements the user might want

Return strict JSON:
{
  "keyword_query": "...",
  "natural_language_query": "...",
  "expansions": ["..."],
  "refinements": ["..."],
  "filters": { "category": null, "date_range": null, "price_range": null }
}`;
    const systemPrompt = `You are a voice-search query rewriter. Output strict JSON only.
Optimise for retrieval recall while preserving user intent.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'voice-search-rewrite', { spokenQuery, searchDomain, locale }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/wakeword-suggest
// Suggest custom wake-words for a brand / deployment
// ---------------------------------------------------------------------------
router.post('/wakeword-suggest', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { brand, productName, language, tone } = req.body;
    if (!brand) return res.status(400).json({ error: 'brand required' });

    const prompt = `
Suggest custom wake-words for this voice-AI deployment.

BRAND: ${brand}
PRODUCT: ${productName || 'voice assistant'}
LANGUAGE: ${language || 'en-US'}
TONE: ${tone || 'friendly'}

Provide 12 wake-word candidates. Each must be:
- 2-4 syllables
- Acoustically distinct (low false-trigger risk against common speech)
- Easy to pronounce in the target language
- Distinguishable from "Alexa", "Siri", "Hey Google", "Cortana", "Bixby"
- Brand-aligned

For each candidate, score 0-10:
- acoustic_uniqueness
- pronounceability
- brand_fit
- false_trigger_risk (lower is better)

Return strict JSON: { "candidates": [ {name, scores, reasoning} ] }`;
    const systemPrompt = `You are a wake-word design expert. Consider phonetic distinctiveness,
syllable stress patterns, and the false-positive landscape against background speech / TV.
Output strict JSON only.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'wakeword-suggest', { brand, productName, language }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/custom-domain-train
// Generate training data for a customer-defined voice domain
// ---------------------------------------------------------------------------
router.post('/custom-domain-train', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { domainName, description, sampleIntents, entities } = req.body;
    if (!domainName) return res.status(400).json({ error: 'domainName required' });

    const prompt = `
Generate training data for a custom voice-AI domain.

DOMAIN: ${domainName}
DESCRIPTION: ${description || 'not provided'}
SAMPLE INTENTS: ${JSON.stringify(sampleIntents || [])}
ENTITY TYPES: ${JSON.stringify(entities || [])}

Produce a complete training plan:
1. 30 paraphrased utterances per provided intent (cover formal, casual, fragmentary, regional variations)
2. 20 negative / out-of-domain utterances to use as classifier negatives
3. Slot-filling examples with annotation in BIO format for the entity types
4. Edge cases that commonly trip up voice NLU (interruptions, partial commands, multi-intent)
5. Recommended evaluation metrics and test split strategy

Return JSON.`;
    const systemPrompt = `You are a voice-AI training-data architect. Produce diverse, realistic utterances
that reflect natural spoken language (not text-typed queries). Output JSON only.`;

    const result = await callOpenRouter(prompt, systemPrompt);

    try {
      await pool.query(
        `INSERT INTO custom_domains (user_id, name, sample_phrases, entities)
         VALUES ($1, $2, $3, $4)`,
        [userId, domainName, JSON.stringify(sampleIntents || []), JSON.stringify(entities || [])]
      );
    } catch (e) {
      console.error('custom_domains insert:', e.message);
    }

    await persistResult(userId, 'custom-domain-train', { domainName, description }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/dialog-respond
// Generate a conversational assistant response
// ---------------------------------------------------------------------------
router.post('/dialog-respond', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversation, persona, latencyTier } = req.body;
    if (!conversation) return res.status(400).json({ error: 'conversation required' });

    const prompt = `
Generate the next assistant turn for this voice-AI conversation.

CONVERSATION (most recent last):
${typeof conversation === 'string' ? conversation : JSON.stringify(conversation, null, 2)}

PERSONA: ${persona || 'helpful, concise, friendly'}
LATENCY TIER: ${latencyTier || 'standard'} (low_latency = <80 words, standard = <160 words)

Constraints for spoken responses:
- No markdown / no code blocks (text-to-speech reads symbols literally)
- Avoid lists longer than 3 items unless specifically requested
- Use contractions; avoid "stochastic" academic phrasing
- End with either a follow-up question or a clear conclusion

Return strict JSON: { "response_ssml": "...", "response_text": "...", "suggested_followups": [..] }`;
    const systemPrompt = `You are a voice-assistant response generator. Output strict JSON.
Always SSML-escape entities. Keep prosody natural; avoid "<break>" abuse.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'dialog-respond', { persona, latencyTier }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/summarize-call
// Summarise a customer-service call transcript
// ---------------------------------------------------------------------------
router.post('/summarize-call', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { transcript, callType } = req.body;
    if (!transcript) return res.status(400).json({ error: 'transcript required' });

    const prompt = `
Summarise this voice-AI customer-service call transcript.

CALL TYPE: ${callType || 'general'}
TRANSCRIPT:
${transcript}

Produce:
1. One-sentence summary
2. Caller's primary issue
3. Resolution status (resolved | unresolved | escalated)
4. Key action items with owner (caller | agent | system)
5. Sentiment trajectory (start -> end)
6. CSAT prediction 1-5
7. Compliance flags (PII disclosed, abusive language, regulated-statement-required)

Return strict JSON.`;
    const systemPrompt = `You are a contact-center call summariser. Output strict JSON only.
Be concise. Flag compliance issues conservatively (false positive better than false negative).`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'summarize-call', { callType }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/voice-command-route
// Route a voice command to the correct skill / sub-domain
// ---------------------------------------------------------------------------
router.post('/voice-command-route', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { transcript, availableSkills, deviceContext } = req.body;
    if (!transcript) return res.status(400).json({ error: 'transcript required' });

    const prompt = `
Route this voice command to the most appropriate skill.

TRANSCRIPT: "${transcript}"
AVAILABLE SKILLS: ${JSON.stringify(availableSkills || [
  'navigation', 'media_playback', 'home_automation', 'messaging',
  'calendar', 'reminders', 'weather', 'commerce', 'q_and_a'
])}
DEVICE CONTEXT: ${JSON.stringify(deviceContext || { device_type: 'unknown' })}

Return strict JSON:
{
  "primary_skill": "...",
  "fallback_skills": [...],
  "skill_arguments": { ... },
  "confidence": 0.0-1.0,
  "ambiguous_with": [...],
  "needs_disambiguation": true|false,
  "disambiguation_prompt": "string or null"
}`;
    const systemPrompt = `You are a voice-skill router. Output strict JSON only.
Prefer the most specific skill. If confidence < 0.6, mark needs_disambiguation = true.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'voice-command-route', { transcript }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/transcript-redact
// Redact PII from a voice transcript before storage / analytics
// ---------------------------------------------------------------------------
router.post('/transcript-redact', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { transcript, jurisdiction } = req.body;
    if (!transcript) return res.status(400).json({ error: 'transcript required' });

    const prompt = `
Redact PII from this voice transcript prior to storage / analytics.

TRANSCRIPT:
${transcript}

JURISDICTION: ${jurisdiction || 'US'}  (governs PII rules: GDPR, CCPA, HIPAA, etc.)

Replace each PII span with a typed placeholder of the form [TYPE_N], e.g. [NAME_1], [EMAIL_1], [PHONE_1], [ADDRESS_1], [CC_1], [SSN_1], [DOB_1].

Return strict JSON:
{
  "redacted_transcript": "...",
  "replacements": [
    { "placeholder": "[NAME_1]", "original": "...", "type": "NAME", "span": [start,end] }
  ],
  "regulated_categories_detected": [...]
}`;
    const systemPrompt = `You are a privacy / PII redactor for voice transcripts. Be exhaustive — false positives are
preferable to leaks. Output strict JSON only. Never echo the original PII outside the "replacements" map.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'transcript-redact', { jurisdiction }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/accent-locale-suggest
// Suggest acoustic/locale model selection from a sample transcript + metadata
// ---------------------------------------------------------------------------
router.post('/accent-locale-suggest', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { sampleTranscript, declaredLocale, deviceRegion } = req.body;
    if (!sampleTranscript) return res.status(400).json({ error: 'sampleTranscript required' });

    const prompt = `
Recommend the best acoustic / language-model variant for this speaker.

SAMPLE TRANSCRIPT (typed signals only — no audio): "${sampleTranscript}"
DECLARED LOCALE: ${declaredLocale || 'unspecified'}
DEVICE REGION: ${deviceRegion || 'unspecified'}

Identify lexical / spelling / phrasing cues that hint at:
- Regional dialect (e.g. en-US south, en-GB north, en-IN, en-AU)
- Likely L1 if speaker is non-native
- Code-switching patterns
- Domain (technical / casual / clinical / automotive)

Return strict JSON:
{
  "recommended_locale_model": "...",
  "secondary_locale_model": "...",
  "code_switch_languages": [...],
  "evidence": ["bullet point cues"],
  "confidence": 0.0-1.0
}`;
    const systemPrompt = `You are a speech-recognition locale router. Output strict JSON only.
Be conservative — suggest the broadest matching model unless cues are strong.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'accent-locale-suggest', { declaredLocale, deviceRegion }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/ai/false-trigger-analyze
// Analyse a wake-word false-trigger sample for a deployed device
// ---------------------------------------------------------------------------
router.post('/false-trigger-analyze', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { wakeWord, surroundingTranscript, deviceType } = req.body;
    if (!wakeWord || !surroundingTranscript) {
      return res.status(400).json({ error: 'wakeWord and surroundingTranscript required' });
    }

    const prompt = `
Analyse this false-trigger event for a voice assistant.

WAKE WORD: "${wakeWord}"
SURROUNDING TRANSCRIPT (~5 seconds before & after the wake event):
${surroundingTranscript}

DEVICE TYPE: ${deviceType || 'unspecified'}

Determine:
1. Likely root cause (TV/media background, similar-phoneme word, child voice, music, name collision)
2. Phonetic confusables to flag for retraining
3. Severity (1-5) — how often this could realistically recur in production
4. Recommended mitigation (sensitivity tweak, blacklist phrase, secondary verification)
5. Whether this should be added to the training negatives set

Return strict JSON.`;
    const systemPrompt = `You are a wake-word false-positive analyst. Be specific and reference the
phonetic similarity between the wake word and any candidate confusables. Output strict JSON only.`;

    const result = await callOpenRouter(prompt, systemPrompt);
    await persistResult(userId, 'false-trigger-analyze', { wakeWord, deviceType }, result);
    res.json({ result: result.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
