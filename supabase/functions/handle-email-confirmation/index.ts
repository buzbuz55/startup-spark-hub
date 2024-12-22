import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:5173'

serve(async (req) => {
  const url = new URL(req.url)
  const token = url.searchParams.get('token')
  const type = url.searchParams.get('type')
  const next = url.searchParams.get('next') || '/'

  // Redirect to the frontend with the token and type
  const redirectUrl = `${SITE_URL}/auth/callback?token=${token}&type=${type}&next=${next}`
  
  return new Response(null, {
    headers: {
      Location: redirectUrl,
    },
    status: 302,
  })
})