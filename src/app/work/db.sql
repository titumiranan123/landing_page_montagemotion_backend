
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

