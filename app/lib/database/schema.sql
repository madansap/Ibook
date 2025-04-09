-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE reading_status AS ENUM ('not_started', 'reading', 'completed', 'paused');
CREATE TYPE highlight_color AS ENUM ('yellow', 'green', 'blue', 'red', 'purple');
CREATE TYPE note_type AS ENUM ('text', 'voice', 'drawing');

-- Create books table
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    cover_url TEXT,
    genre TEXT,
    format TEXT NOT NULL, -- EPUB, PDF, TXT
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chapters table
CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (linked with Clerk)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_books table
CREATE TABLE user_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    status reading_status DEFAULT 'not_started',
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER,
    last_read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, book_id)
);

-- Create highlights table
CREATE TABLE highlights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    color highlight_color DEFAULT 'yellow',
    start_position INTEGER NOT NULL,
    end_position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notes table
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type note_type DEFAULT 'text',
    position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collections table
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create book_collections junction table
CREATE TABLE book_collections (
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (book_id, collection_id)
);

-- Create reading_stats table
CREATE TABLE reading_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    reading_time INTEGER DEFAULT 0, -- in minutes
    reading_speed INTEGER, -- words per minute
    completion_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_explanations table
CREATE TABLE ai_explanations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    selected_text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    explanation_type TEXT NOT NULL, -- simple, detailed, academic
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_chapters_book_id ON chapters(book_id);
CREATE INDEX idx_user_books_user_id ON user_books(user_id);
CREATE INDEX idx_user_books_book_id ON user_books(book_id);
CREATE INDEX idx_highlights_user_id ON highlights(user_id);
CREATE INDEX idx_highlights_book_id ON highlights(book_id);
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_book_id ON notes(book_id);
CREATE INDEX idx_collections_user_id ON collections(user_id);
CREATE INDEX idx_reading_stats_user_id ON reading_stats(user_id);
CREATE INDEX idx_reading_stats_book_id ON reading_stats(book_id);

-- Enable Row Level Security (RLS)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_explanations ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Books policies
CREATE POLICY "Books are viewable by everyone" ON books
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert books" ON books
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Chapters policies
CREATE POLICY "Chapters are viewable by everyone" ON chapters
    FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert chapters" ON chapters
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Users policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = clerk_id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = clerk_id);

-- User books policies
CREATE POLICY "Users can view their own books" ON user_books
    FOR SELECT USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage their own books" ON user_books
    FOR ALL USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

-- Highlights policies
CREATE POLICY "Users can view their own highlights" ON highlights
    FOR SELECT USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage their own highlights" ON highlights
    FOR ALL USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

-- Notes policies
CREATE POLICY "Users can view their own notes" ON notes
    FOR SELECT USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage their own notes" ON notes
    FOR ALL USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

-- Collections policies
CREATE POLICY "Users can view their own collections" ON collections
    FOR SELECT USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage their own collections" ON collections
    FOR ALL USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

-- Reading stats policies
CREATE POLICY "Users can view their own reading stats" ON reading_stats
    FOR SELECT USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage their own reading stats" ON reading_stats
    FOR ALL USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

-- AI explanations policies
CREATE POLICY "Users can view their own AI explanations" ON ai_explanations
    FOR SELECT USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id));

CREATE POLICY "Users can manage their own AI explanations" ON ai_explanations
    FOR ALL USING (auth.uid() = (SELECT clerk_id FROM users WHERE id = user_id)); 