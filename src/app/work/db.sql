CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Auto UUID
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,        -- image URL
  video_link TEXT NOT NULL,       -- video URL (e.g. YouTube, Cloudflare R2)
  is_visible BOOLEAN NOT NULL DEFAULT true,
  is_feature BOOLEAN NOT NULL DEFAULT false,
  position INTEGER,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
