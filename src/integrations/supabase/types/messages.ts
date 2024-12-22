export type Message = {
  Row: {
    id: string
    sender_id: string
    receiver_id: string
    content: string
    created_at: string | null
    read_at: string | null
  }
  Insert: {
    sender_id: string
    receiver_id: string
    content: string
    id?: string
    created_at?: string | null
    read_at?: string | null
  }
  Update: {
    sender_id?: string
    receiver_id?: string
    content?: string
    id?: string
    created_at?: string | null
    read_at?: string | null
  }
  Relationships: []
}