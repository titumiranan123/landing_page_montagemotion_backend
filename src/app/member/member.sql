CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('team_member', 'influencer')) NOT NULL,
  designation TEXT,
  photourl TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  bio TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
