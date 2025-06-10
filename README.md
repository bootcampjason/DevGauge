DevGauge - AI Assisted Assessment Platform

Phase 1: MVP Scope – "DevGauge"
🎯 Objective
Build a usable, hosted, AI-powered skill assessment app that:

Accepts resume uploads
Analyzes them via OpenAI
Simulates a conversational Q&A
Presents coding challenges in a custom editor
Generates a final score/feedback

🔹 1. Project Setup
 Next.js + TypeScript + App Router
 TailwindCSS setup
 MongoDB Atlas (Mongoose or Prisma)
 OpenAI API Key env setup
 File upload feature (PDF resume upload)

 🔹 2. Authentication
 Clerk or NextAuth.js (GitHub/Email login)
 Protect dashboard routes

 🔹 3. Stage 1 – Resume Analyzer
 User uploads resume → Send to OpenAI via /api/analyze-resume
 AI generates level + 5 tailored questions
 Simple chat interface with AI (one prompt at a time)
 Store chat transcript + AI score to DB

 🔹 4. Stage 2 – Coding Test
 Create code editor page (CodeMirror or Monaco)
 Fetch 4 questions based on level
 User writes code, runs against sample test cases
 Basic evaluation simulation (mock for now)
 Score stored in DB

 🔹 5. Completion Page
 Final screen shows “Thank you” + score breakdown
 Option to download result as PDF (future)

🧱 Base Tech Stack

## Feature	Stack
Frontend:	        React (Next.js App Router)
Auth:	            Clerk.dev (easier for MVP)
Backend APIs:       Next.js API Routes
File Upload:    	FormData + Cloudinary or UploadThing
AI Integration: 	OpenAI API (GPT-4)
Code Editor:    	CodeMirror or Monaco
DB:             	MongoDB Atlas + Mongoose
Hosting:            Vercel


🧠 High-Level Plan
🔹 Features:
Display the AI’s first question after resume analysis
Allow user to respond
AI reads response, replies with another question (up to 5 rounds)
Store conversation (optional for now)

