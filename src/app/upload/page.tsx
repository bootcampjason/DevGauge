"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.summary);
      setError("");
    } catch (err: any) {
      setError("Upload failed. Please try again.");
      console.error(err);
    }
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

      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded space-y-4">
          <div>
            <strong>AI Summary:</strong>
            <p>{result}</p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push("/dashboard")}
          >
            Continue to AI Interview
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </main>
  );
}
