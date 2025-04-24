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
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    video_link VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    type VARCHAR(20) NOT NULL CHECK (type IN ('main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising', 'website')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);
