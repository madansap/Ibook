export type ReadingStatus = 'not_started' | 'reading' | 'completed' | 'paused';
export type HighlightColor = 'yellow' | 'green' | 'blue' | 'red' | 'purple';
export type NoteType = 'text' | 'voice' | 'drawing';

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover_url?: string;
  genre?: string;
  format: string;
  file_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  book_id: string;
  chapter_number: number;
  title?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  clerk_id: string;
  username?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface UserBook {
  id: string;
  user_id: string;
  book_id: string;
  status: ReadingStatus;
  current_page: number;
  total_pages?: number;
  last_read_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Highlight {
  id: string;
  user_id: string;
  book_id: string;
  chapter_id: string;
  content: string;
  color: HighlightColor;
  start_position: number;
  end_position: number;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  book_id: string;
  chapter_id: string;
  content: string;
  type: NoteType;
  position?: number;
  created_at: string;
  updated_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookCollection {
  book_id: string;
  collection_id: string;
  created_at: string;
}

export interface ReadingStats {
  id: string;
  user_id: string;
  book_id: string;
  reading_time: number;
  reading_speed?: number;
  completion_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface AIExplanation {
  id: string;
  user_id: string;
  book_id: string;
  chapter_id: string;
  selected_text: string;
  explanation: string;
  explanation_type: string;
  created_at: string;
} 