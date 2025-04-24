CREATE TABLE about (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  isPublish VARCHAR(10) DEFAULT 'false'
);
