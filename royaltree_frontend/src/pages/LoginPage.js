import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { UserContext } from "../App";

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const result = await apiPost("/auth/login", { username, password }, null, true);
      if (result && result.access_token) {
        // Optionally fetch user profile info too
        setUser({ token: result.access_token });
        navigate("/");
      } else {
        setError("Invalid response");
      }
    } catch (e) {
      setError("Login failed: " + (e.message || e));
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 320, margin: "0 auto" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required autoFocus />
      </div>
      <div>
        <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
