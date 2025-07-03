import React, { useState, useContext } from "react";
import { apiPost } from "../api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

// PUBLIC_INTERFACE
export default function RegisterPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Allowed roles for frontend strict validation
  const allowedRoles = ["creator", "investor"];

  // PUBLIC_INTERFACE
  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setFieldErrors((fe) => ({ ...fe, [e.target.name]: undefined }));
  }

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess(""); setFieldErrors({});
    const errs = {};

    // Client-side validation
    if (!form.username || form.username.length < 3) errs.username = "Username required (min 3 chars)";
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.password || form.password.length < 7) errs.password = "Password required (min 7 chars)";
    if (form.password2 !== form.password) errs.password2 = "Passwords do not match";
    if (!allowedRoles.includes(form.role)) errs.role = "Role required (creator or investor)";
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setLoading(true);
    try {
      // Exact field names as backend expects:
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      };
      // Force JSON payload
      const resp = await apiPost("/auth/register", payload, null, false);
      // Backend should return {token, role, username...} or error
      setUser(resp);
      setSuccess("Registration successful. Redirecting...");
      setTimeout(() => navigate("/"), 1200);
    } catch (e) {
      // Show API/network/CORS errors clearly for diagnostics
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
      aria-label="Registration form"
    >
      <h2 className="font-heading text-2xl neon-mint font-bold mb-2">Create Your Account</h2>
      <div>
        <label className="block text-gold mb-1">Username</label>
        <input
          type="text"
          name="username"
          required
          autoFocus
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          value={form.username}
          onChange={handleInputChange}
          disabled={loading}
        />
        {fieldErrors.username && (
          <span className="text-red-500 text-xs">{fieldErrors.username}</span>
        )}
      </div>
      <div>
        <label className="block text-gold mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          value={form.email}
          onChange={handleInputChange}
          disabled={loading}
        />
        {fieldErrors.email && (
          <span className="text-red-500 text-xs">{fieldErrors.email}</span>
        )}
      </div>
      <div>
        <label className="block text-gold mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          minLength={7}
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          value={form.password}
          onChange={handleInputChange}
          disabled={loading}
        />
        {fieldErrors.password && (
          <span className="text-red-500 text-xs">{fieldErrors.password}</span>
        )}
      </div>
      <div>
        <label className="block text-gold mb-1">Confirm Password</label>
        <input
          type="password"
          name="password2"
          required
          minLength={7}
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          value={form.password2}
          onChange={handleInputChange}
          disabled={loading}
        />
        {fieldErrors.password2 && (
          <span className="text-red-500 text-xs">{fieldErrors.password2}</span>
        )}
      </div>
      <div>
        <label className="block text-gold mb-1">Role</label>
        <select
          name="role"
          required
          className="w-full px-3 py-2 rounded-lg bg-background border border-gold/30 text-white"
          value={form.role}
          onChange={handleInputChange}
          disabled={loading}
        >
          <option value="">Select role...</option>
          <option value="creator">Creator</option>
          <option value="investor">Investor</option>
        </select>
        {fieldErrors.role && (
          <span className="text-red-500 text-xs">{fieldErrors.role}</span>
        )}
      </div>
      {error && (
        <div className="bg-red-900/40 text-red-300 border border-red-600/40 rounded p-2 text-xs">
          <strong>Error: </strong>{error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/20 text-green-200 border border-green-600/30 rounded p-2 text-xs">
          {success}
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 mt-2 font-heading rounded-lg bg-gradient-to-r from-neon-mint to-gold text-background font-bold shadow-neon hover:scale-105 transition"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="text-sm mt-2">
        Already have an account?{" "}
        <a href="/login" className="underline neon-mint hover:text-gold font-semibold">Login</a>
      </div>
    </form>
  );
}
