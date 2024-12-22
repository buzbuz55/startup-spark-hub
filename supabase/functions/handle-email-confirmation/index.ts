import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:5173';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const type = url.searchParams.get('type');
  const next = url.searchParams.get('next') || '/';

  if (!token || !type) {
    return new Response(
      JSON.stringify({ error: 'Missing token or type parameter' }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  // Redirect to the frontend with the token and type
  const redirectUrl = `${SITE_URL}/auth/callback?token=${token}&type=${type}&next=${next}`;
  
  return new Response(null, {
    headers: {
      ...corsHeaders,
      Location: redirectUrl,
    },
    status: 302,
  });
});