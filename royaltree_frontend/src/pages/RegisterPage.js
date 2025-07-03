import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { UserContext } from "../App";

export default function RegisterPage() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("creator");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await apiPost("/auth/register", { username, email, role, password }, null, false);
      if (result && result.id) {
        setUser({ username, role });
        navigate("/");
      } else {
        setError("Registration failed");
      }
    } catch (e) {
      setError("Error: " + (e.message || e));
    }
  }

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Register</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="creator">Creator</option>
        <option value="investor">Investor</option>
      </select>
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}
