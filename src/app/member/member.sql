CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Basic Info
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('Team Member', 'Influencer')) NOT NULL,
  designation TEXT,
  photourl TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  bio TEXT,
  position INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
