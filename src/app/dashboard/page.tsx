'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    { role: 'ai', content: "Let's begin. What was the most technically challenging project on your resume?" }
  ]);
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setChat((prev) => [...prev, userMessage]);
    setInput('');
    setIsSubmitting(true);

    const res = await fetch('/api/ai-qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat: [...chat, userMessage] }),
    });

    const data = await res.json();
    setChat((prev) => [...prev, { role: 'ai', content: data.reply }]);
    setIsSubmitting(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Interview</h1>
      <div className="space-y-2">
        {chat.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'ai' ? 'bg-gray-100' : 'bg-blue-100 text-right'}`}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
        />
        <button
          onClick={sendMessage}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </main>
  );
}
