import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function History() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      const res = await api.get("/questions/history");
      setResumes(res.data);
    };
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Uploaded Resumes</h2>

        {resumes.map((r) => (
          <div
            key={r.resumeId}
            className="border p-3 rounded mb-3 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/history/${r.resumeId}`)}
          >
            <p className="font-medium">{r.fileName}</p>
            <p className="text-sm text-gray-500">
              Generated Sets: {r.questionSets}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
