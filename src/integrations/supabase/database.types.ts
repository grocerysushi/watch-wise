export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string
          id: string
          last_updated: string | null
          media_id: number
          media_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_updated?: string | null
          media_id: number
          media_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_updated?: string | null
          media_id?: number
          media_type?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          preferences: Json | null
          created_at: string | null
          last_login: string | null
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
          created_at?: string | null
          last_login?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          preferences?: Json | null
          created_at?: string | null
          last_login?: string | null
        }
      }
      sitemap_entries: {
        Row: {
          change_freq: string | null
          id: string
          last_modified: string | null
          media_id: number | null
          media_type: string | null
          priority: number | null
          url: string
        }
        Insert: {
          change_freq?: string | null
          id?: string
          last_modified?: string | null
          media_id?: number | null
          media_type?: string | null
          priority?: number | null
          url: string
        }
        Update: {
          change_freq?: string | null
          id?: string
          last_modified?: string | null
          media_id?: number | null
          media_type?: string | null
          priority?: number | null
          url?: string
        }
        Relationships: []
      }
      watched: {
        Row: {
          episode_number: number | null
          id: string
          media_id: number
          media_type: string
          season_number: number | null
          user_id: string
          watched_at: string | null
        }
        Insert: {
          episode_number?: number | null
          id?: string
          media_id: number
          media_type: string
          season_number?: number | null
          user_id: string
          watched_at?: string | null
        }
        Update: {
          episode_number?: number | null
          id?: string
          media_id?: number
          media_type?: string
          season_number?: number | null
          user_id?: string
          watched_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
