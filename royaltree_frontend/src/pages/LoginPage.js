import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { UserContext } from "../App";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
/**
 * Login page for Royaltree: users login with email and role.
 * Provides modern UI, frontend validation, direct backend connection, session update & robust error/success feedback.
 */
export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // User must select a role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!role || !["creator", "investor", "admin"].includes(role)) {
      setError("Please select a valid role.");
      return;
    }
    setLoading(true);
    try {
      const payload = { email, role };
      const result = await apiPost("/auth/login", payload, null, false);
      if (result && (result.access_token || result.token)) {
        setUser({
          token: result.access_token || result.token,
          email: result.email || email,
          role: result.role || role,
        });
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          if (role === "creator") navigate("/creator/dashboard");
          else if (role === "investor") navigate("/investor/dashboard");
          else if (role === "admin") navigate("/admin");
          else navigate("/");
        }, 800);
      } else {
        setError(
          (result && result.detail) ||
            "Login failed. Please try again or contact support."
        );
      }
    } catch (e) {
      let message = "Login error: ";
      try {
        const errObj = JSON.parse(e.message);
        message += errObj.detail || e.message;
      } catch {
        message += e.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[70vh]">
      <motion.div
        className="relative bg-glass-black/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-glass border border-gold/30 max-w-md w-full"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        <div className="absolute -top-10 left-8 flex items-center gap-2">
          <svg
            className="w-8 h-8 text-gold drop-shadow"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <ellipse cx="12" cy="12" rx="8" ry="10" className="stroke-gold/80" fill="gold" fillOpacity={0.24} />
            <path
              d="M7 12h10M12 7v10"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="stroke-gold"
              strokeWidth={2}
            />
          </svg>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold neon-mint tracking-tight drop-shadow-md">
            Login
          </h1>
        </div>
        <form className="pt-10 flex flex-col gap-6" onSubmit={handleLogin} autoComplete="on">
          {error && (
            <motion.div
              className="mb-2 text-sm text-red-400 px-3 py-1 rounded bg-glass-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              className="mb-2 text-sm text-neon-mint px-3 py-1 rounded bg-glass-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="login-email" className="font-heading text-sm font-semibold text-gold/90">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="transition border border-gold/30 rounded-lg px-4 py-2 bg-background/70 text-white focus:outline-none focus:border-neon-mint/80 font-body"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="login-role" className="font-heading text-sm font-semibold text-gold/90">
              Role
            </label>
            <select
              id="login-role"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              className="transition border border-gold/30 rounded-lg px-4 py-2 bg-background/60 text-white"
            >
              <option value="">(Select role)</option>
              <option value="creator">Creator</option>
              <option value="investor">Investor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-xl font-heading font-bold text-lg bg-gradient-to-r from-neon-mint via-white/20 to-gold shadow-neon border-0 outline-none relative text-background
              before:absolute before:-inset-1 before:blur before:bg-gradient-to-r before:from-neon-mint before:via-gold/60 before:to-neon-mint/60
              hover:scale-105 hover:shadow-goldish transition-transform
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`
            }
            initial={{ boxShadow: "0px 0px 0px #00FFC2" }}
            animate={{
              boxShadow: ["0 0 0px #00FFC2", "0 0 16px #00FFC2, 0 0 2px #FFD700"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
            }}
          >
            <span className="relative z-10">{loading ? "Signing in..." : "Sign In"}</span>
          </motion.button>
        </form>
        <div className="mt-5 text-gray-400 text-xs flex items-center justify-center gap-1">
          <span>New to Royaltree?</span>
          <a
            href="/register"
            className="neon-mint font-semibold hover:underline"
          >
            Register
          </a>
        </div>
      </motion.div>
    </div>
  );
}
