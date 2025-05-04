CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('Team Member', 'Influencer')) NOT NULL,
  designation TEXT,
  username TEXT,
  photourl TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,

  -- Influencer Specific
  niche TEXT,
  followers INTEGER,
  platforms TEXT[],              -- Example: ['Instagram', 'YouTube']
  collaborationtype TEXT[],      -- Example: ['Paid Promotion', 'Affiliate Marketing']
  engagementrate NUMERIC(5, 2),  -- For storing percentages like 7.50

  portfoliolinks TEXT[],         -- List of URLs

  -- Team Member Specific
  skills TEXT[],                 -- Example: ['Design', 'Video Editing']

  -- Common
  sociallinks JSONB,             -- Store all social links as JSON object

  -- Position for ordering
  position INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
