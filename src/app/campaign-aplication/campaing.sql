CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  ovc TEXT NOT NULL,
  message TEXT NOT NULL,

  selectedinfuencers TEXT[] NOT NULL,

  budget TEXT NOT NULL,
  project_brief TEXT NOT NULL,

  is_read TEXT,
  is_marked TEXT,
  is_rejected BOOLEAN DEFAULT FALSE,
  is_sent BOOLEAN DEFAULT FALSE,
  rejected_message TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
