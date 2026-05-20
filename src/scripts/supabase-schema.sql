-- PR Auto-Pilot Database Schema
-- Run this in Supabase SQL Editor

-- PR Queries table
CREATE TABLE IF NOT EXISTS pr_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL DEFAULT 'unknown',
  from_email TEXT,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 50 CHECK (score >= 0 AND score <= 100),
  reason TEXT,
  ai_draft TEXT,
  final_response TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'rejected')),
  submitted_by_user_id UUID,
  submitted_by_email TEXT,
  approved_by_user_id UUID,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PR Users table
CREATE TABLE IF NOT EXISTS pr_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PR Stats table
CREATE TABLE IF NOT EXISTS pr_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  queries_received INTEGER DEFAULT 0,
  high_score_matches INTEGER DEFAULT 0,
  medium_score_matches INTEGER DEFAULT 0,
  responses_sent INTEGER DEFAULT 0,
  mentions_obtained INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pr_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_stats ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by the app)
-- No public access needed

-- Increment stats function
CREATE OR REPLACE FUNCTION increment_pr_stats(p_date DATE, p_score INTEGER)
RETURNS void AS $$
BEGIN
  INSERT INTO pr_stats (date, queries_received, high_score_matches, medium_score_matches)
  VALUES (p_date, 1, CASE WHEN p_score >= 70 THEN 1 ELSE 0 END, CASE WHEN p_score >= 40 AND p_score < 70 THEN 1 ELSE 0 END)
  ON CONFLICT (date) DO UPDATE SET
    queries_received = pr_stats.queries_received + 1,
    high_score_matches = pr_stats.high_score_matches + (CASE WHEN p_score >= 70 THEN 1 ELSE 0 END),
    medium_score_matches = pr_stats.medium_score_matches + (CASE WHEN p_score >= 40 AND p_score < 70 THEN 1 ELSE 0 END);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_pr_responses(p_date DATE)
RETURNS void AS $$
BEGIN
  INSERT INTO pr_stats (date, responses_sent) VALUES (p_date, 1)
  ON CONFLICT (date) DO UPDATE SET responses_sent = pr_stats.responses_sent + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
