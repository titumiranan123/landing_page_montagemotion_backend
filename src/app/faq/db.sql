-- ENUM type for faq category
CREATE TYPE faq_type AS ENUM (
  'main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising', 'website'
);

-- FAQs table
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  sub_title VARCHAR(255) NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  type faq_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ items table
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id UUID NOT NULL,  -- Matches type of faqs.id
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (faq_id) REFERENCES faqs(id) ON DELETE CASCADE
);

