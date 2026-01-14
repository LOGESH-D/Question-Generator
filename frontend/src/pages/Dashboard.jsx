import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <p className="mb-6">
          Welcome, <b>{user?.name}</b>
        </p>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
          onClick={() => navigate("/generate")}
        >
          Generate Questions
        </button>

        <button
          className="w-full bg-red-500 text-white py-2 rounded"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
