CREATE TABLE testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    message TEXT,
    video_message TEXT,
    position INTEGER,
    type VARCHAR(20) CHECK (type IN ('short_video', 'talking_head', 'podcast', 'thumbnail'))
);
