import { NextResponse } from 'next/server';
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { chat } = await req.json();

  if (!chat || !Array.isArray(chat)) {
    return NextResponse.json({ error: 'Invalid chat data' }, { status: 400 });
  }

  const messages = [
    { role: 'system', content: 'You are an expert technical interviewer. Ask up to 5 in-depth software engineering questions based on a candidate\'s resume and responses.' },
    ...chat.map((msg: any) => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.content,
    }))
  ];

  const aiRes = await openai.createChatCompletion({
    model: 'gpt-4',
    messages,
    temperature: 0.4,
  });

  const reply = aiRes.data.choices[0].message?.content;

  return NextResponse.json({ reply });
}
