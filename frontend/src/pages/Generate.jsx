import { useState } from "react";
import api from "../api/axios";

export default function Generate() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const uploadRes = await api.post("/resume/upload", formData);
      const resumeId = uploadRes.data.resumeId;

      const genRes = await api.post("/questions/generate", {
        resumeId,
        level,
      });

      setQuestions(genRes.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Generate Interview Questions
        </h2>

        <input
          type="file"
          className="mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <select
          className="w-full border p-2 rounded mb-4"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-6 space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="border p-4 rounded">
              <p className="font-semibold">
                Q{i + 1}: {q.question}
              </p>

              <p className="mt-2 text-gray-700">
                <b>Ideal Answer:</b> {q.idealAnswer}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                <b>Based On:</b> {q.basedOn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
