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

    const prompt = `As an expert copywriter and AI writing assistant, create an engaging personal bio:

    Person: ${fullName}
    Current Bio: ${currentBio || 'None provided'}
    Interests/Hobbies: ${hobbies.join(', ')}
    
    Guidelines:
    - Write in first person perspective
    - Keep it concise (max 200 words)
    - Balance professionalism with personality
    - Naturally incorporate their interests
    - Make it memorable and engaging
    - Use a friendly, conversational tone
    
    Please create a bio that feels authentic and personal while highlighting key aspects of their profile.`

    console.log('Generating bio with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert copywriter specializing in creating authentic, engaging personal bios.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error('Failed to generate bio');
    }

    const data = await response.json()
    const generatedBio = data.choices[0].message.content.trim()

    console.log('Successfully generated bio:', generatedBio);

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