import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SITE_URL = Deno.env.get('SITE_URL') || 'https://startup-spark-hub.vercel.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    console.log('Redirecting to:', `${SITE_URL}/auth/callback?token=${token}&type=${type}&next=${next}`);
    
    // Redirect to the frontend with the token and type
    const redirectUrl = `${SITE_URL}/auth/callback?token=${token}&type=${type}&next=${next}`;
    
    return new Response(null, {
      headers: {
        ...corsHeaders,
        Location: redirectUrl,
      },
      status: 302,
    });
  } catch (error) {
    console.error('Error handling email confirmation:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});