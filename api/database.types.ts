export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  halfleap: {
    Tables: {
      adapters: {
        Row: {
          added_at: string;
          id: string;
          name: string;
        };
        Insert: {
          added_at?: string;
          id?: string;
          name: string;
        };
        Update: {
          added_at?: string;
          id?: string;
          name?: string;
        };
      };
      contacts: {
        Row: {
          birth_date: string | null;
          created_at: string;
          disambiguation: string | null;
          email: string;
          first_name: string;
          id: string;
          is_me: boolean;
          last_name: string;
          lives_in_id: string | null;
          met_at_id: string | null;
          nationality: string | null;
        };
        Insert: {
          birth_date?: string | null;
          created_at?: string;
          disambiguation?: string | null;
          email: string;
          first_name: string;
          id?: string;
          is_me?: boolean;
          last_name: string;
          lives_in_id?: string | null;
          met_at_id?: string | null;
          nationality?: string | null;
        };
        Update: {
          birth_date?: string | null;
          created_at?: string;
          disambiguation?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          is_me?: boolean;
          last_name?: string;
          lives_in_id?: string | null;
          met_at_id?: string | null;
          nationality?: string | null;
        };
      };
      events: {
        Row: {
          created_at: string;
          id: number;
          message: string;
          source: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message: string;
          source: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string;
          source?: string;
          url?: string;
        };
      };
      locations: {
        Row: {
          coordinates: unknown;
          id: string;
          is_exact: boolean;
          is_private: boolean;
        };
        Insert: {
          coordinates: unknown;
          id?: string;
          is_exact: boolean;
          is_private?: boolean;
        };
        Update: {
          coordinates?: unknown;
          id?: string;
          is_exact?: boolean;
          is_private?: boolean;
        };
      };
      notes: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_private: boolean;
          updated_at: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          id?: string;
          is_private?: boolean;
          updated_at?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_private?: boolean;
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          created_at: string;
          id: string;
          is_private: boolean;
          updated_at: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_private?: boolean;
          updated_at?: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_private?: boolean;
          updated_at?: string;
          url?: string;
        };
      };
      shared_locations: {
        Row: {
          contact_id: string;
          location_id: string;
        };
        Insert: {
          contact_id: string;
          location_id: string;
        };
        Update: {
          contact_id?: string;
          location_id?: string;
        };
      };
      shared_notes: {
        Row: {
          contact_id: string;
          note_id: string;
        };
        Insert: {
          contact_id: string;
          note_id: string;
        };
        Update: {
          contact_id?: string;
          note_id?: string;
        };
      };
      shared_resources: {
        Row: {
          contact_id: string;
          resource_id: string;
        };
        Insert: {
          contact_id: string;
          resource_id: string;
        };
        Update: {
          contact_id?: string;
          resource_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
