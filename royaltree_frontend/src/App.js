import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import "./App.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatorDashboard from "./pages/CreatorDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import AssetDetailPage from "./pages/AssetDetailPage";
import MarketplacePage from "./pages/MarketplacePage";
import AssetUploadPage from "./pages/AssetUploadPage";
import TransactionsPage from "./pages/TransactionsPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import HealthCheckPage from "./pages/HealthCheckPage";
import NotFoundPage from "./pages/NotFoundPage";

// Simple context for user/session info
export const UserContext = React.createContext(null);

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null); // {token, role, username, ...}

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    if (!window._AOS_INIT) {
      AOS.init({ duration: 800, once: true, offset: 40 });
      window._AOS_INIT = true;
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // PUBLIC_INTERFACE
  function logout() { setUser(null); }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <Router>
        <div className="App min-h-screen flex flex-col bg-background text-white font-body transition-colors duration-500">
          <HeaderNav
            user={user}
            logout={logout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <main className="main-content flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <MotionSection key="landing">
                    <LandingPage />
                  </MotionSection>
                } />
                <Route path="/login" element={
                  <MotionSection key="login">
                    <LoginPage />
                  </MotionSection>
                } />
                <Route path="/register" element={
                  <MotionSection key="register">
                    <RegisterPage />
                  </MotionSection>
                } />
                <Route path="/health" element={
                  <MotionSection key="healthcheck">
                    <HealthCheckPage />
                  </MotionSection>
                } />
                <Route path="/creator/dashboard" element={
                  <RequireAuth role="creator">
                    <MotionSection key="creator">
                      <CreatorDashboard />
                    </MotionSection>
                  </RequireAuth>
                } />
                <Route path="/creator/upload" element={
                  <RequireAuth role="creator">
                    <MotionSection key="upload">
                      <AssetUploadPage />
                    </MotionSection>
                  </RequireAuth>
                } />
                <Route path="/investor/dashboard" element={
                  <RequireAuth role="investor">
                    <MotionSection key="investor">
                      <InvestorDashboard />
                    </MotionSection>
                  </RequireAuth>
                } />
                <Route path="/marketplace" element={
                  <RequireAuth role={["investor"]} allowGuest={true}>
                    <MotionSection key="marketplace">
                      <MarketplacePage />
                    </MotionSection>
                  </RequireAuth>
                } />
                <Route path="/assets/:id" element={
                  <MotionSection key="asset-detail">
                    <AssetDetailPage />
                  </MotionSection>
                } />
                <Route path="/transactions" element={
                  <RequireAuth>
                    <MotionSection key="transactions">
                      <TransactionsPage />
                    </MotionSection>
                  </RequireAuth>
                } />
                <Route path="/admin/*" element={
                  <RequireAuth role="admin">
                    <MotionSection key="admin">
                      <AdminPanelPage />
                    </MotionSection>
                  </RequireAuth>
                } />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

// Glassmorphic/gradient animated header/nav
function HeaderNav({ user, logout, theme, toggleTheme }) {
  return (
    <motion.header
      className="sticky top-0 z-[100] transition-colors"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
    >
      <nav
        className="w-full mx-auto mt-0 mb-4 px-4 md:px-10 py-3 flex gap-3 md:gap-5 justify-center rounded-xl
          shadow-glass
          bg-glass-black/80 backdrop-blur-xl
          border-b border-gold/20"
        style={{
          backdropFilter: 'blur(14px)',
        }}
      >
        <Link
          to="/"
          className="font-heading text-2xl neon-mint font-bold tracking-tight transition hover:scale-105"
        >
          Royaltree
        </Link>
        <Link
          to="/marketplace"
          className="px-2 py-1 rounded font-heading transition hover:text-gold"
        >
          Marketplace
        </Link>
        {user && user.role === "creator" && (
          <Link
            to="/creator/dashboard"
            className="px-2 py-1 rounded font-heading transition hover:text-gold"
          >
            Creator Dashboard
          </Link>
        )}
        {user && user.role === "investor" && (
          <Link
            to="/investor/dashboard"
            className="px-2 py-1 rounded font-heading transition hover:text-gold"
          >
            Investor Dashboard
          </Link>
        )}
        {user && (
          <Link
            to="/transactions"
            className="px-2 py-1 rounded font-heading transition hover:text-gold"
          >
            Transactions
          </Link>
        )}
        {user && user.role === "admin" && (
          <Link
            to="/admin"
            className="px-2 py-1 rounded font-heading gold font-bold transition hover:scale-110"
          >
            Admin Panel
          </Link>
        )}

        <button
          className={`
            ml-4 px-4 py-1 rounded-xl bg-gradient-to-r from-neon-mint to-gold text-background font-heading
            font-bold shadow-neon transition-transform duration-200
            hover:scale-105 hover:shadow-goldish
          `}
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        {!user && (
          <>
            <Link
              to="/login"
              className="px-2 py-1 rounded font-heading transition hover:text-neon-mint"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-2 py-1 rounded font-heading transition hover:text-neon-mint"
            >
              Register
            </Link>
          </>
        )}
        {user && (
          <button
            className="ml-1 px-3 py-1 bg-background/20 backdrop-blur rounded-lg border border-glass-white font-heading font-semibold gold shadow hover:scale-105 transition"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </nav>
    </motion.header>
  );
}

// Utility wrapper for animated "section" with fade/scale on route transitions.
function MotionSection({ children, key }) {
  return (
    <motion.section
      key={key}
      initial={{ opacity: 0, scale: 0.98, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="col-span-full"
      data-aos="fade-in"
    >
      {children}
    </motion.section>
  );
}

// PUBLIC_INTERFACE
function RequireAuth({ children, role, allowGuest }) {
  // Consumes auth context, redirect if not logged in or lacks role
  const { user } = React.useContext(UserContext);
  const location = useLocation();
  if (!user) {
    if (allowGuest) return children;
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role) {
    const allowed = Array.isArray(role) ? role.includes(user.role) : user.role === role;
    if (!allowed) return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
