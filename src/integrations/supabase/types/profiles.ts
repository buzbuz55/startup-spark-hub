export type Profile = {
  Row: {
    id: string
    phone_number: string | null
    email: string | null
    full_name: string | null
    created_at: string
    updated_at: string
    avatar_url: string | null
    linkedin_url: string | null
    twitter_url: string | null
    website_url: string | null
    hobbies: string[] | null
    bio: string | null
  }
  Insert: {
    id: string
    phone_number?: string | null
    email?: string | null
    full_name?: string | null
    created_at?: string
    updated_at?: string
    avatar_url?: string | null
    linkedin_url?: string | null
    twitter_url?: string | null
    website_url?: string | null
    hobbies?: string[] | null
    bio?: string | null
  }
  Update: {
    id?: string
    phone_number?: string | null
    email?: string | null
    full_name?: string | null
    created_at?: string
    updated_at?: string
    avatar_url?: string | null
    linkedin_url?: string | null
    twitter_url?: string | null
    website_url?: string | null
    hobbies?: string[] | null
    bio?: string | null
  }
  Relationships: []
}