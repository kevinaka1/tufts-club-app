export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          mock_id: string | null
          name: string
        }
        Insert: {
          id?: string
          mock_id?: string | null
          name: string
        }
        Update: {
          id?: string
          mock_id?: string | null
          name?: string
        }
        Relationships: []
      }
      club_categories: {
        Row: {
          category_id: string
          club_id: string
        }
        Insert: {
          category_id?: string
          club_id?: string
        }
        Update: {
          category_id?: string
          club_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_categories_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          banner_url: string
          created_at: string
          description: string
          email: string
          id: string
          image_url: string
          instagram: string | null
          location: string | null
          logo_url: string
          meeting_time: string
          members: number
          mission: string
          mock_id: string | null
          name: string
        }
        Insert: {
          banner_url: string
          created_at: string
          description: string
          email: string
          id?: string
          image_url: string
          instagram?: string | null
          location?: string | null
          logo_url: string
          meeting_time: string
          members: number
          mission: string
          mock_id?: string | null
          name?: string
        }
        Update: {
          banner_url?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          image_url?: string
          instagram?: string | null
          location?: string | null
          logo_url?: string
          meeting_time?: string
          members?: number
          mission?: string
          mock_id?: string | null
          name?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          club_id: string | null
          description: string
          end_date: string
          id: string
          image_url: string
          location: string
          mock_id: string | null
          name: string
          organizer: string | null
          rsvp_deadline: string | null
          start_date: string
          type: string
        }
        Insert: {
          club_id?: string | null
          description: string
          end_date: string
          id?: string
          image_url: string
          location: string
          mock_id?: string | null
          name: string
          organizer?: string | null
          rsvp_deadline?: string | null
          start_date: string
          type: string
        }
        Update: {
          club_id?: string | null
          description?: string
          end_date?: string
          id?: string
          image_url?: string
          location?: string
          mock_id?: string | null
          name?: string
          organizer?: string | null
          rsvp_deadline?: string | null
          start_date?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      forming_club_categories: {
        Row: {
          category_id: string
          forming_club_id: string
        }
        Insert: {
          category_id?: string
          forming_club_id?: string
        }
        Update: {
          category_id?: string
          forming_club_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forming_club_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forming_club_categories_forming_club_id_fkey"
            columns: ["forming_club_id"]
            isOneToOne: false
            referencedRelation: "forming_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      forming_clubs: {
        Row: {
          description: string
          founding_member: string
          id: string
          mock_id: string | null
          name: string
        }
        Insert: {
          description: string
          founding_member: string
          id?: string
          mock_id?: string | null
          name: string
        }
        Update: {
          description?: string
          founding_member?: string
          id?: string
          mock_id?: string | null
          name?: string
        }
        Relationships: []
      }
      user_followed_clubs: {
        Row: {
          club_id: string
          user_id: string
        }
        Insert: {
          club_id?: string
          user_id?: string
        }
        Update: {
          club_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_followed_clubs_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_followed_clubs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interested_forming_clubs: {
        Row: {
          forming_club_id: string
          user_id: string
        }
        Insert: {
          forming_club_id?: string
          user_id?: string
        }
        Update: {
          forming_club_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interested_forming_clubs_forming_club_id_fkey"
            columns: ["forming_club_id"]
            isOneToOne: false
            referencedRelation: "forming_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interested_forming_clubs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_liked_categories: {
        Row: {
          category_id: string
          user_id: string
        }
        Insert: {
          category_id?: string
          user_id?: string
        }
        Update: {
          category_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_liked_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_liked_categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rsvpd_events: {
        Row: {
          event_id: string
          user_id: string
        }
        Insert: {
          event_id?: string
          user_id?: string
        }
        Update: {
          event_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_rsvpd_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_rsvpd_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string
          first_name: string
          graduation_year: number
          id: string
          last_name: string
          mock_id: string | null
        }
        Insert: {
          email: string
          first_name: string
          graduation_year: number
          id?: string
          last_name: string
          mock_id?: string | null
        }
        Update: {
          email?: string
          first_name?: string
          graduation_year?: number
          id?: string
          last_name?: string
          mock_id?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
