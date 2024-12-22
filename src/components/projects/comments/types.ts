export interface Comment {
  id: string;
  content: string;
  created_at: string;
  file_url?: string | null;
  file_type?: string | null;
  user: {
    full_name: string | null;
    avatar_url: string | null;
  };
}