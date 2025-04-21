CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL CHECK (name IN ('Basic', 'Standard', 'Premium')),
  price NUMERIC NOT NULL,
  duration INT NOT NULL,
  delivery_days INT NOT NULL,
  revisions INT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (
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

CREATE TABLE package_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id INT REFERENCES packages(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  isActive BOOLEAN DEFAULT true
);
