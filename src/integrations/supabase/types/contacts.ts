export type Contact = {
  Row: {
    id: string
    user_id: string
    contact_id: string
    created_at: string | null
  }
  Insert: {
    user_id: string
    contact_id: string
    id?: string
    created_at?: string | null
  }
  Update: {
    user_id?: string
    contact_id?: string
    id?: string
    created_at?: string | null
  }
  Relationships: []
}