export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('resume') as File;

  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }
  
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Extract text from PDF
  const pdfText = await pdf(buffer).then((data) => data.text);
  
  // Send text to OpenAI
  const prompt = `
  Analyze the following resume and estimate the candidate's software engineering skill level.
  Respond with a 1-sentence summary and assign a level: Junior, Mid-Level, or Senior.
  
  Resume:
  ${pdfText}
  `;
  
  const aiRes = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert technical interviewer.' },
      { role: 'user', content: prompt },
    ],
  });
  
  console.log('aiRes', aiRes)
  const message = aiRes.choices[0].message?.content;

  return NextResponse.json({ summary: message });
}
