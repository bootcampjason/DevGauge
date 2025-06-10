export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { chat } = await req.json();

  if (!chat || !Array.isArray(chat)) {
    return NextResponse.json({ error: 'Invalid chat history' }, { status: 400 });
  }

  // If we've already done 5 total exchanges (5 user messages), stop
  const userMessages = chat.filter((msg: any) => msg.role === 'user');
  if (userMessages.length >= 5) {
    return NextResponse.json({ reply: 'Thank you — the interview is complete. You’ll get your results shortly.' });
  }

  // Format messages for OpenAI
  const messages = [
    { role: 'system', content: 'You are an expert technical interviewer. Ask up to 5 detailed follow-up questions based on the candidate\'s resume and answers. Be concise and relevant.' },
    ...chat.map((msg: any) => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.content,
    }))
  ];

  const aiRes = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.4,
  });

  const reply = aiRes.choices[0]?.message?.content || 'Sorry, something went wrong.';

  return NextResponse.json({ reply });
}
