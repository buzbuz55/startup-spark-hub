export type Profile = {
  Row: {
    id: string
    phone_number: string | null
    email: string | null
    full_name: string | null
    created_at: string
    updated_at: string
    avatar_url: string | null
  }
  Insert: {
    id: string
    phone_number?: string | null
    email?: string | null
    full_name?: string | null
    created_at?: string
    updated_at?: string
    avatar_url?: string | null
  }
  Update: {
    id?: string
    phone_number?: string | null
    email?: string | null
    full_name?: string | null
    created_at?: string
    updated_at?: string
    avatar_url?: string | null
  }
  Relationships: []
}