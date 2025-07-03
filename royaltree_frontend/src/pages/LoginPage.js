import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../api";
import { UserContext } from "../App";

// PUBLIC_INTERFACE
/**
 * Login page with a single form (username, email, password, role)
 * Validates frontend fields and calls /auth/login API endpoint
 * Sets the global user on success (via context), routes appropriately
 */
export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  // Form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "creator",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  // Simple frontend validation for all fields
  function validate(fields) {
    const errs = {};
    if (!fields.username.trim()) errs.username = "Username is required.";
    if (!fields.email.trim()) {
      errs.email = "Email is required.";
    } else if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errs.email = "Invalid email format.";
    }
    if (!fields.password) {
      errs.password = "Password is required.";
    } else if (fields.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    if (!["creator", "investor"].includes(fields.role)) {
      errs.role = "Role must be creator or investor.";
    }
    return errs;
  }

  // Handle form input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: undefined }));
    setApiError("");
  }

  // Handle form submit, API call
  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setSubmitting(true);
    try {
      // API expects: username, email, password, role
      const resp = await apiPost("/auth/login", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      }, null, false);
      // Expecting {token, role, username, ...}
      setUser(resp);
      navigate(
        location.state && location.state.from
          ? location.state.from.pathname
          : resp.role === "creator"
          ? "/creator/dashboard"
          : resp.role === "investor"
          ? "/investor/dashboard"
          : "/"
      );
    } catch (e) {
      setApiError(e.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-glass-black/85 p-8 rounded-2xl shadow-glass border border-gold/20 mt-10">
      <h2 className="font-heading text-2xl neon-mint font-bold text-center mb-6 drop-shadow">Login to Royaltree</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="username" className="font-heading text-gold block mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoFocus
            autoComplete="username"
            className="form-input w-full rounded-md px-3 py-2 bg-background border border-glass-white focus:border-neon-mint focus:ring-2 focus:ring-neon-mint"
            value={form.username}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.username && <span className="text-red-400 text-sm">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email" className="font-heading text-gold block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className="form-input w-full rounded-md px-3 py-2 bg-background border border-glass-white focus:border-neon-mint focus:ring-2 focus:ring-neon-mint"
            value={form.email}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password" className="font-heading text-gold block mb-1">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            className="form-input w-full rounded-md px-3 py-2 bg-background border border-glass-white focus:border-neon-mint focus:ring-2 focus:ring-neon-mint"
            value={form.password}
            onChange={handleChange}
            disabled={submitting}
          />
          {errors.password && <span className="text-red-400 text-sm">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="role" className="font-heading text-gold block mb-1">Role</label>
          <select
            id="role"
            name="role"
            className="form-select w-full rounded-md px-3 py-2 bg-background border border-glass-white focus:border-neon-mint focus:ring-2 focus:ring-neon-mint"
            value={form.role}
            onChange={handleChange}
            disabled={submitting}
            required
          >
            <option value="creator">Creator</option>
            <option value="investor">Investor</option>
          </select>
          {errors.role && <span className="text-red-400 text-sm">{errors.role}</span>}
        </div>
        <button
          type="submit"
          className="mt-3 py-2 px-6 bg-gradient-to-r from-neon-mint via-gold to-neon-mint text-background font-heading font-bold rounded-xl shadow-neon hover:shadow-goldish hover:scale-105 transition disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
        {apiError && <div className="text-red-400 text-center mt-2">{apiError}</div>}
      </form>
    </div>
  );
}
