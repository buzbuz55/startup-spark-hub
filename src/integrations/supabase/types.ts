export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          contact_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          contact_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          contact_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string
          creator_id: string
          guest_email: string | null
          id: string
          meeting_link: string | null
          room_id: string
          scheduled_date: string
          status: string | null
        }
        Insert: {
          created_at?: string
          creator_id: string
          guest_email?: string | null
          id?: string
          meeting_link?: string | null
          room_id: string
          scheduled_date: string
          status?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string
          guest_email?: string | null
          id?: string
          meeting_link?: string | null
          room_id?: string
          scheduled_date?: string
          status?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read_at: string | null
          receiver_id: string
          sender_id: string
          status: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          receiver_id: string
          sender_id: string
          status?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
          status?: string | null
        }
        Relationships: []
      }
      New: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      poll_votes: {
        Row: {
          created_at: string | null
          id: string
          option_index: number
          poll_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_index: number
          poll_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          option_index?: number
          poll_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          message_id: string
          options: Json
          question: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          message_id: string
          options?: Json
          question: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          message_id?: string
          options?: Json
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_companies: {
        Row: {
          company_name: string
          created_at: string
          equity_percentage: number | null
          id: string
          investment_amount: number | null
          investment_date: string
          sector: string | null
          stage: string | null
          status: string | null
          updated_at: string
          vc_firm_id: string
        }
        Insert: {
          company_name: string
          created_at?: string
          equity_percentage?: number | null
          id?: string
          investment_amount?: number | null
          investment_date: string
          sector?: string | null
          stage?: string | null
          status?: string | null
          updated_at?: string
          vc_firm_id: string
        }
        Update: {
          company_name?: string
          created_at?: string
          equity_percentage?: number | null
          id?: string
          investment_amount?: number | null
          investment_date?: string
          sector?: string | null
          stage?: string | null
          status?: string | null
          updated_at?: string
          vc_firm_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_companies_vc_firm_id_fkey"
            columns: ["vc_firm_id"]
            isOneToOne: false
            referencedRelation: "vc_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          hobbies: string[] | null
          id: string
          linkedin_url: string | null
          phone_number: string | null
          twitter_url: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          hobbies?: string[] | null
          id: string
          linkedin_url?: string | null
          phone_number?: string | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          hobbies?: string[] | null
          id?: string
          linkedin_url?: string | null
          phone_number?: string | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      vc_firms: {
        Row: {
          created_at: string
          firm_name: string
          fund_size: string | null
          geographic_focus: string[] | null
          id: string
          investment_stage: string[] | null
          investment_thesis: string | null
          max_check_size: number | null
          min_check_size: number | null
          preferred_sectors: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          firm_name: string
          fund_size?: string | null
          geographic_focus?: string[] | null
          id?: string
          investment_stage?: string[] | null
          investment_thesis?: string | null
          max_check_size?: number | null
          min_check_size?: number | null
          preferred_sectors?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          firm_name?: string
          fund_size?: string | null
          geographic_focus?: string[] | null
          id?: string
          investment_stage?: string[] | null
          investment_thesis?: string | null
          max_check_size?: number | null
          min_check_size?: number | null
          preferred_sectors?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      video_sessions: {
        Row: {
          created_at: string
          creator_id: string
          id: string
          participant_id: string | null
          room_id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          creator_id: string
          id?: string
          participant_id?: string | null
          room_id: string
          status?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: string
          participant_id?: string | null
          room_id?: string
          status?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
