CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('CREATOR','REVIEWER','ADMIN')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'CREATOR';
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name='password') THEN
    EXECUTE 'UPDATE users SET password_hash=password WHERE password_hash IS NULL';
  END IF;
  IF EXISTS (SELECT 1 FROM users WHERE password_hash IS NULL) THEN RAISE EXCEPTION 'Every existing user requires a password hash'; END IF;
END $$;
ALTER TABLE users ALTER COLUMN password_hash SET NOT NULL;

CREATE TABLE media_projects (
  id BIGSERIAL PRIMARY KEY,
  owner_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title VARCHAR(160) NOT NULL,
  language VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX media_projects_owner_idx ON media_projects(owner_user_id, updated_at DESC);

CREATE TABLE media_versions (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES media_projects(id) ON DELETE RESTRICT,
  version_number INTEGER NOT NULL CHECK (version_number > 0),
  processing_state VARCHAR(20) NOT NULL DEFAULT 'QUEUED' CHECK (processing_state IN ('QUEUED','PROCESSING','READY','FAILED','CANCELLED')),
  review_state VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (review_state IN ('DRAFT','IN_REVIEW','APPROVED','REJECTED')),
  transcript TEXT NOT NULL CHECK (char_length(transcript) BETWEEN 1 AND 20000),
  transcript_provenance VARCHAR(30) NOT NULL CHECK (transcript_provenance='HUMAN_SUPPLIED'),
  object_key VARCHAR(255) NOT NULL,
  captions_key VARCHAR(255),
  source_filename VARCHAR(255) NOT NULL,
  content_sha256 CHAR(64) NOT NULL,
  content_type VARCHAR(80) NOT NULL,
  size_bytes INTEGER NOT NULL CHECK (size_bytes > 0),
  sample_rate_hz INTEGER,
  channel_count INTEGER,
  bit_depth INTEGER,
  duration_ms INTEGER,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  submitted_at TIMESTAMPTZ,
  reviewed_by INTEGER REFERENCES users(id) ON DELETE RESTRICT,
  decision_reason VARCHAR(1000),
  decided_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, version_number),
  UNIQUE(object_key),
  UNIQUE(content_sha256, project_id, version_number)
);
CREATE INDEX media_versions_project_idx ON media_versions(project_id, version_number DESC);

CREATE TABLE media_jobs (
  id BIGSERIAL PRIMARY KEY,
  version_id BIGINT NOT NULL UNIQUE REFERENCES media_versions(id) ON DELETE RESTRICT,
  job_type VARCHAR(40) NOT NULL CHECK (job_type='VALIDATE_AND_CAPTION'),
  status VARCHAR(20) NOT NULL DEFAULT 'QUEUED' CHECK (status IN ('QUEUED','RUNNING','SUCCEEDED','FAILED','CANCELLED')),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 3),
  max_attempts INTEGER NOT NULL DEFAULT 3 CHECK (max_attempts=3),
  cancellation_requested BOOLEAN NOT NULL DEFAULT FALSE,
  error_code VARCHAR(80),
  error_message VARCHAR(500),
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX media_jobs_status_idx ON media_jobs(status, created_at);

CREATE TABLE media_audit_events (
  id BIGSERIAL PRIMARY KEY,
  sequence BIGINT NOT NULL UNIQUE,
  project_id BIGINT NOT NULL REFERENCES media_projects(id) ON DELETE RESTRICT,
  version_id BIGINT REFERENCES media_versions(id) ON DELETE RESTRICT,
  actor_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  action VARCHAR(80) NOT NULL,
  outcome VARCHAR(30) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  previous_hash CHAR(64) NOT NULL,
  event_hash CHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX media_audit_project_idx ON media_audit_events(project_id, sequence);

CREATE OR REPLACE FUNCTION reject_media_audit_mutation() RETURNS trigger AS $$
BEGIN RAISE EXCEPTION 'media audit events are immutable'; END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER media_audit_immutable BEFORE UPDATE OR DELETE ON media_audit_events FOR EACH ROW EXECUTE FUNCTION reject_media_audit_mutation();

CREATE OR REPLACE FUNCTION protect_approved_media_version() RETURNS trigger AS $$
BEGIN
  IF OLD.review_state='APPROVED' AND OLD IS DISTINCT FROM NEW THEN RAISE EXCEPTION 'approved media version is immutable'; END IF;
  IF NOT ((OLD.review_state=NEW.review_state) OR (OLD.review_state='DRAFT' AND NEW.review_state='IN_REVIEW') OR (OLD.review_state='IN_REVIEW' AND NEW.review_state IN ('APPROVED','REJECTED'))) THEN
    RAISE EXCEPTION 'invalid media review transition';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER media_version_review_guard BEFORE UPDATE ON media_versions FOR EACH ROW EXECUTE FUNCTION protect_approved_media_version();
