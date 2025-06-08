'use client';
import { useState } from 'react';

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('cliked!')
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    console.log('hello')

    const res = await fetch('/api/analyze-resume', {
      method: 'POST',
      body: formData,
    });

    console.log('end')

    const result = await res.json();
    console.log('AI response:', result);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Upload Your Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze Resume
        </button>
      </form>
    </main>
  );
}
