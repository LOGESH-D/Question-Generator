import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function HistoryDetail() {
  const { resumeId } = useParams();
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await api.get(`/questions/history/${resumeId}`);
      setSets(res.data);
    };
    loadData();
  }, [resumeId]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Generated Questions</h2>

        {sets.map((set, i) => (
          <div key={set._id} className="mb-6">
            <p className="font-semibold mb-2">Level: {set.level}</p>

            {set.questions.map((q, idx) => (
              <div key={idx} className="border p-3 rounded mb-3">
                <p>
                  <b>Q:</b> {q.question}
                </p>
                <p className="mt-1">
                  <b>A:</b> {q.idealAnswer}
                </p>
                <p className="text-sm text-gray-500">Based on: {q.basedOn}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
