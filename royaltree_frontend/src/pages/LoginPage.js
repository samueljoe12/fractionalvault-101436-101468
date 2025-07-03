import React, { useState, useContext } from "react";
import { apiPost } from "../api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

// PUBLIC_INTERFACE
export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: undefined }));
  }

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setFieldErrors({});
    const errs = {};
    if (!form.username || form.username.length < 3) errs.username = "Username required";
    if (!form.password) errs.password = "Password required";
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setLoading(true);
    try {
      // Accepts either email or username on backend, but here we send 'username'
      const resp = await apiPost("/auth/login", {
        username: form.username,
        password: form.password
      }, null, false);
      // Backend should return {token, role, username, ...}
      setUser(resp);
      setTimeout(() => navigate("/"), 600);
    } catch (e) {
      let msg = typeof e === "string" ? e : (e.message || String(e));
      if (/Failed to fetch/i.test(msg) || msg.startsWith("TypeError: Failed to fetch")) {
        msg = "Network/server connection failed. Check CORS, API URL, and backend health.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  return (
    <form onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-glass-black/80 p-8 mt-10 rounded-xl shadow-glass border border-gold/30 flex flex-col gap-5"
      autoComplete="off"
      aria-label="Login form"
    >
      <h2 className="font-heading text-2xl neon-mint font-bold mb-2">Sign In</h2>
      <div>
        <label className="block text-gold mb-1">Username</label>
        <input
          type="text"
          name="username"
          required
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          disabled={loading}
        />
        {fieldErrors.username && (
          <span className="text-red-500 text-xs">{fieldErrors.username}</span>
        )}
      </div>
      <div>
        <label className="block text-gold mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
        />
        {fieldErrors.password && (
          <span className="text-red-500 text-xs">{fieldErrors.password}</span>
        )}
      </div>
      {error && (
        <div className="bg-red-900/40 text-red-300 border border-red-600/40 rounded p-2 text-xs">
          <strong>Error: </strong>{error}
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 mt-2 font-heading rounded-lg bg-gradient-to-r from-neon-mint to-gold text-background font-bold shadow-neon hover:scale-105 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="text-sm mt-2">
        Don't have an account?{" "}
        <a href="/register" className="underline neon-mint hover:text-gold font-semibold">Register</a>
      </div>
    </form>
  );
}
