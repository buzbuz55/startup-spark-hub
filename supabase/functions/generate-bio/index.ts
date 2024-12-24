import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { currentBio, fullName, hobbies } = await req.json()

    const prompt = `As a creative AI assistant, craft an engaging and professional bio for ${fullName}.
    ${currentBio ? `Their current bio is: "${currentBio}". Please enhance it while maintaining their authentic voice.` : 'Create a fresh, engaging bio that captures their essence.'}
    Their interests and hobbies include: ${hobbies.join(', ')}.
    
    Guidelines:
    - Keep it concise (max 200 words)
    - Strike a balance between professional and personable
    - Incorporate their hobbies naturally
    - Make it engaging and memorable
    - Use a friendly, approachable tone
    
    Please write the bio in first person perspective.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a professional bio writer specializing in creating engaging, personalized professional bios.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate bio')
    }

    const data = await response.json()
    const generatedBio = data.choices[0].message.content

    return new Response(
      JSON.stringify({ generatedBio }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-bio function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})