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
