CREATE TABLE seo_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name VARCHAR(50) UNIQUE NOT NULL CHECK (
    page_name IN (
      'main', 'shorts', 'talking', 'podcast', 'graphic', 'advertising',
      'website', 'about', 'terms', 'privacy', 'contact', 'blog'
    )
  ),
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  meta_keywords TEXT,
  canonical_url TEXT,
  robots VARCHAR(20) CHECK (
    robots IN ('index, follow', 'noindex, nofollow', 'index, nofollow', 'noindex, follow')
  ),
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  schema TEXT,
  structured_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
