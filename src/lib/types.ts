export interface UserProfile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  preferences: Record<string, any>;
  created_at: string | null;
  last_login: string | null;
}

export interface Favorite {
  id: string;
  user_id: string;
  media_id: number;
  media_type: 'movie' | 'tv';
  created_at: string;
  last_updated: string | null;
}