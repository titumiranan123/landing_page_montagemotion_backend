CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE headers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  book_link TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  alt TEXT NOT NULL,
  video_link TEXT NOT NULL,
  type TEXT NOT NULL CHECK (
    type IN (
      'main',
      'shorts',
      'talking',
      'podcast',
      'graphic',
      'advertising',
      'website'
    )
  ),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
