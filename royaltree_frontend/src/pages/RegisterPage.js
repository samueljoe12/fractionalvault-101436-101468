import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { UserContext } from "../App";
import { motion } from "framer-motion";

// PUBLIC_INTERFACE
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
    <div className="w-full h-full flex items-center justify-center min-h-[70vh]">
      <motion.div
        className="relative bg-glass-black/70 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl shadow-glass border border-gold/30 max-w-md w-full"
        initial={{ opacity: 0, y: 44, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.0, type: "spring" }}
      >
        <div className="absolute -top-10 left-8 flex items-center gap-2">
          <svg
            className="w-8 h-8 text-gold drop-shadow"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <ellipse cx="12" cy="12" rx="9" ry="10" className="stroke-gold/90" fill="gold" fillOpacity={0.30}/>
            <path
              d="M12 6v6l4 2"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="stroke-gold"
              strokeWidth={2}
            />
          </svg>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold neon-mint tracking-tight drop-shadow-md">
            Register
          </h1>
        </div>
        <form className="pt-10 flex flex-col gap-5" onSubmit={handleRegister} autoComplete="on">
          {error && (
            <motion.div
              className="mb-2 text-sm text-red-400 px-3 py-1 rounded bg-glass-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-username" className="font-heading text-sm font-semibold text-gold/90">
              Username
            </label>
            <input
              id="reg-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
              className="transition border border-gold/30 rounded-lg px-4 py-2 bg-background/70 text-white focus:outline-none focus:border-neon-mint/80 font-body"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-email" className="font-heading text-sm font-semibold text-gold/90">
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="transition border border-gold/30 rounded-lg px-4 py-2 bg-background/70 text-white focus:outline-none focus:border-neon-mint/80 font-body"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-role" className="font-heading text-sm font-semibold text-gold/90">
              Role
            </label>
            <select
              id="reg-role"
              value={role}
              onChange={e => setRole(e.target.value)}
              className="transition border border-gold/30 rounded-lg px-4 py-2 bg-background/70 text-white focus:outline-none focus:border-neon-mint/80 font-body"
            >
              <option value="creator">Creator</option>
              <option value="investor">Investor</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="reg-password" className="font-heading text-sm font-semibold text-gold/90">
              Password
            </label>
            <input
              id="reg-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="transition border border-gold/30 rounded-lg px-4 py-2 bg-background/70 text-white focus:outline-none focus:border-neon-mint/80 font-body"
            />
          </div>
          <motion.button
            type="submit"
            className="mt-7 w-full py-3 rounded-xl font-heading font-bold text-lg bg-gradient-to-r from-neon-mint via-white/20 to-gold shadow-neon border-0 outline-none relative text-background
              before:absolute before:-inset-1 before:blur before:bg-gradient-to-r before:from-neon-mint before:via-gold/60 before:to-neon-mint/60
              hover:scale-105 hover:shadow-goldish transition-transform"
            initial={{ boxShadow: "0px 0px 0px #00FFC2" }}
            animate={{ boxShadow: [
              "0 0 0px #00FFC2, 0 0 0px #FFD700",
              "0 0 12px #00FFC2, 0 0 3px #FFD700"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2.2,
            }}
          >
            <span className="relative z-10">Create Account</span>
          </motion.button>
        </form>
        <div className="mt-6 text-gray-400 text-xs flex items-center justify-center gap-1">
          <span>Already have an account?</span>
          <a
            href="/login"
            className="neon-mint font-semibold hover:underline"
          >
            Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}
