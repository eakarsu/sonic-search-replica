CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS ai_results (
  id SERIAL PRIMARY KEY, user_id INTEGER, endpoint VARCHAR(100) NOT NULL,
  request_params JSONB, result_text TEXT NOT NULL, model_used VARCHAR(100),
  tokens_used INTEGER, created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS voice_transcripts (
  id SERIAL PRIMARY KEY, user_id INTEGER, transcript TEXT NOT NULL,
  language VARCHAR(20), domain VARCHAR(50), confidence NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS custom_domains (
  id SERIAL PRIMARY KEY, user_id INTEGER, name VARCHAR(100) NOT NULL,
  sample_phrases TEXT, entities JSONB, created_at TIMESTAMP DEFAULT NOW()
);
