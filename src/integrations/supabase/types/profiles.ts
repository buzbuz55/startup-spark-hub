export type Profile = {
  Row: {
    id: string
    phone_number: string | null
    email: string | null
    full_name: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id: string
    phone_number?: string | null
    email?: string | null
    full_name?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    phone_number?: string | null
    email?: string | null
    full_name?: string | null
    created_at?: string
    updated_at?: string
  }
  Relationships: []
}