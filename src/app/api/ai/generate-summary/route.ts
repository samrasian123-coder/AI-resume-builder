import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request
    const { jobTitle, experience, skills } = await req.json();

    if (!jobTitle) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    // 3. Generate summary using OpenAI
    const prompt = `
      Write a professional, ATS-friendly resume summary for a ${jobTitle}. 
      ${experience ? `Incorporate the following experience context: ${experience}.` : ''}
      ${skills ? `Highlight these key skills: ${skills}.` : ''}
      
      Keep it between 3 to 4 sentences. Make it impactful, action-oriented, and tailored for modern tech or corporate roles.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert resume writer and career coach.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const summary = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ summary });

  } catch (error: any) {
    console.error('AI Summary Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
