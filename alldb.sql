CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE user_login_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device TEXT,
  browser TEXT,
  ip_address VARCHAR(100) NOT NULL,
  login_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  location TEXT,
  is_successful BOOLEAN DEFAULT TRUE
);
CREATE TABLE user_dynamic_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reset_password_token TEXT,
  reset_password_expire_at TIMESTAMP,
  verification_token TEXT,
  verification_token_expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE about (
  id PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,

);
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE faq_type AS ENUM (
  'main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising', 'website'
);


CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  sub_title VARCHAR(255) NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    type faq_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id CHAR(36) NOT NULL,          -- Relation to faqs.id
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  position INT NOT NULL DEFAULT 0,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  FOREIGN KEY (faq_id) REFERENCES faqs(id) ON DELETE CASCADE
);

CREATE TABLE  services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  isPublish TEXT NOT NULL,
  href TEXT NOT NULL,
  position INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_visible BOOLEAN DEFAULT TRUE,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  currency VARCHAR(10) DEFAULT 'USD',
  price NUMERIC(10, 2) NOT NULL,
  unit VARCHAR(50),
  pricing_type VARCHAR(50),
  note TEXT,
  puchase_link TEXT,
  type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE package_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  is_present BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
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


CREATE TABLE Works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    description TEXT,
    thumbnail VARCHAR(512),
    video_link VARCHAR(512) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    is_feature BOOLEAN DEFAULT FALSE,
    position INTEGER,
    type VARCHAR(50) NOT NULL CHECK (type IN ('main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising', 'website')),
    sub_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


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


CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Requires pgcrypto extension or use uuid_generate_v4()
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  ovc TEXT NOT NULL,
  message TEXT NOT NULL,
  selected_influencers TEXT[] NOT NULL, -- PostgreSQL array of TEXT
  budget TEXT NOT NULL,
  project_brief TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_marked BOOLEAN DEFAULT FALSE,
  is_rejected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('Team Member', 'Influencer')) NOT NULL,
  designation TEXT,          -- For Team Member
  username TEXT,             -- For Influencer
  photourl TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,

  -- Influencer specific
  niche TEXT,
  followers INTEGER,
  platforms TEXT[],          -- Example: ['Instagram', 'YouTube']
  collaboration_type TEXT[], -- Example: ['Paid Promotion', 'Affiliate Marketing']
  engagement_rate NUMERIC,   -- Percentage like 4.5

  portfolio_links TEXT[],    -- List of URLs

  -- Team Member specific
  skills TEXT[],

  -- Common social links
  instagram TEXT,
  facebook TEXT,
  linkedin TEXT,
  twitter TEXT,
  tiktok TEXT,
  youtube TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
