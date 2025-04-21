CREATE TABLE states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  isActive BOOLEAN DEFAULT true,
  type VARCHAR(50) NOT NULL CHECK (type IN (
    'main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising', 'website'
  )),
  states JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
