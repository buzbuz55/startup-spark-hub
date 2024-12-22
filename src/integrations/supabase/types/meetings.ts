export type Meeting = {
  Row: {
    id: string
    creator_id: string
    scheduled_date: string
    room_id: string
    created_at: string
    status: string | null
  }
  Insert: {
    creator_id: string
    scheduled_date: string
    room_id: string
    id?: string
    created_at?: string
    status?: string | null
  }
  Update: {
    creator_id?: string
    scheduled_date?: string
    room_id?: string
    id?: string
    created_at?: string
    status?: string | null
  }
  Relationships: []
}