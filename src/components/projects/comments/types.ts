export interface Comment {
  id: string;
  content: string;
  created_at: string;
  file_url?: string;
  file_type?: string;
  user: {
    full_name: string;
    avatar_url: string;
  };
}