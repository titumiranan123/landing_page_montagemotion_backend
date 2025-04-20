CREATE TYPE header_type AS ENUM (
  'main',
  'shorts',
  'talking',
  'podcast',
  'graphic',
  'advertising',
  'website'
);
CREATE TABLE headers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thumbnail TEXT NOT NULL,
  video_link TEXT NOT NULL,
  isActive BOOLEAN NOT NULL DEFAULT FALSE,
  type header_type NOT NULL
);
