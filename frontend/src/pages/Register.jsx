import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { name, email, password });
    alert("Registered successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Register
          </button>
        </form>

        <p
          className="text-center text-blue-600 mt-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
