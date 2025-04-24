
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  message TEXT,
  image TEXT,
  video_message TEXT,
  position INTEGER DEFAULT 0,
  type TEXT NOT NULL CHECK (
    type IN ('main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising', 'website')
  ),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


