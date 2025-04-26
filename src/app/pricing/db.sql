
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
