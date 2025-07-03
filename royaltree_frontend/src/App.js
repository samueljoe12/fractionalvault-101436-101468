import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet, Link } from "react-router-dom";
import "./App.css";
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
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null); // {token, role, username, ...}

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // PUBLIC_INTERFACE
  function logout() { setUser(null); }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <Router>
        <div className="App">
          <header className="App-header" style={{ minHeight: 0, padding: 0, marginBottom: 24 }}>
            <nav className="navbar" style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center", padding: 16 }}>
              <Link to="/">Royaltree</Link>
              <Link to="/marketplace">Marketplace</Link>
              {user && user.role === "creator" && <Link to="/creator/dashboard">Creator Dashboard</Link>}
              {user && user.role === "investor" && <Link to="/investor/dashboard">Investor Dashboard</Link>}
              {user && <Link to="/transactions">Transactions</Link>}
              {user && user.role === "admin" && <Link to="/admin">Admin Panel</Link>}
              <button className="theme-toggle" onClick={toggleTheme}>Theme: {theme}</button>
              {!user && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
              {user && <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>}
            </nav>
          </header>
          <main className="main-content" style={{ padding: 24 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/health" element={<HealthCheckPage />} />
              <Route path="/creator/dashboard" element={
                <RequireAuth role="creator"><CreatorDashboard /></RequireAuth>
              } />
              <Route path="/creator/upload" element={
                <RequireAuth role="creator"><AssetUploadPage /></RequireAuth>
              } />
              <Route path="/investor/dashboard" element={
                <RequireAuth role="investor"><InvestorDashboard /></RequireAuth>
              } />
              <Route path="/marketplace" element={
                <RequireAuth role={["investor"]} allowGuest={true}><MarketplacePage /></RequireAuth>
              } />
              <Route path="/assets/:id" element={<AssetDetailPage />} />
              <Route path="/transactions" element={
                <RequireAuth><TransactionsPage /></RequireAuth>
              } />
              <Route path="/admin/*" element={
                <RequireAuth role="admin"><AdminPanelPage /></RequireAuth>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserContext.Provider>
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
