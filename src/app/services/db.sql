CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image TEXT,
  isPublish BOOLEAN DEFAULT FALSE,
  position INTEGER NOT NULL
);
