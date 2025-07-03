import React, { useEffect, useState } from "react";

/**
 * Diagnostic/debug page to display the runtime API base URL as seen by the frontend,
 * and list calls to key API endpoints for verification/troubleshooting.
 * Visit this page at "/api-debug" in the browser.
 */
function getApiBaseDebug() {
  // Mirror logic from src/api.js
  let windowDefined = typeof window !== "undefined";
  return (
    (windowDefined && window._API_BASE_URL) ||
    (windowDefined && window.env && window.env.REACT_APP_BACKEND_BASE_URL) ||
    process.env.REACT_APP_BACKEND_BASE_URL ||
    process.env.BACKEND_BASE_URL ||
    "http://localhost:3001"
  );
}

// PUBLIC_INTERFACE
export default function ApiDebugPage() {
  const [apiBase, setApiBase] = useState("");
  const [healthResult, setHealthResult] = useState(null);
  const [registerResult, setRegisterResult] = useState(null);
  const [error, setError] = useState("");
  const [networkLog, setNetworkLog] = useState([]);

  useEffect(() => {
    setApiBase(getApiBaseDebug());
    // Record XHR/fetch for /health/db and /auth/register as demo
    const interceptFetch = () => {
      if (!window._API_DEBUG_INSTALLED) {
        const origFetch = window.fetch;
        window.fetch = async (...args) => {
          let url = args[0];
          let method = (args[1] && args[1].method) || "GET";
          let req = { url, method, time: new Date().toISOString() };
          try {
            let resp = await origFetch(...args);
            let clone = resp.clone();
            req.status = clone.status;
            req.responseURL = clone.url;
            req.headers = {};
            clone.headers.forEach((v, k) => { req.headers[k] = v; });
            setNetworkLog((prev) => [...prev.slice(-14), req]);
            return resp;
          } catch (e) {
            req.error = String(e);
            setNetworkLog((prev) => [...prev.slice(-14), req]);
            throw e;
          }
        };
        window._API_DEBUG_INSTALLED = true;
      }
    };
    interceptFetch();
    // Try a GET /health/db
    fetch(getApiBaseDebug() + "/health/db", {
      credentials: "include"
    })
      .then(r => r.json().then(j => setHealthResult({ status: r.status, ...j })))
      .catch(e => setError("Health check failed: " + e));
    // Try a POST /auth/register (fake user, dry run)
    fetch(getApiBaseDebug() + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: "__testdebug" + Math.floor(Math.random() * 10000),
          email: "testdebug@fake.io",
          role: "creator",
          password: "testdebug123"
        })
    })
      .then(r => r.json().then(j => setRegisterResult({ status: r.status, ...j })))
      .catch(e => setRegisterResult({ error: String(e) }));
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "40px auto", padding: 32, background: "rgba(22,28,38,0.97)", borderRadius: 18, color: "#fff" }}>
      <h2>API Connectivity Debug Page</h2>
      <p>
        <b>Runtime API Base URL:</b>{" "}
        <span style={{ color: "#FFD700", fontFamily: "monospace" }}>{apiBase}</span>
      </p>
      <p>
        This is what the <b>browser sees</b> as the API base (mirroring src/api.js logic).
      </p>
      <h3>Sample /health/db Response</h3>
      <pre style={{ background: "#19283a", padding: 10, borderRadius: 9 }}>
        {healthResult ? JSON.stringify(healthResult, null, 2) : (error || "Loading...")}
      </pre>
      <h3>Test /auth/register (demo call)</h3>
      <pre style={{ background: "#19283a", padding: 10, borderRadius: 9 }}>
        {registerResult ? JSON.stringify(registerResult, null, 2) : "Loading..."}
      </pre>
      <h3>Recent API Calls by This Page</h3>
      <div style={{ fontSize: 13 }}>
        <ol>
          {networkLog.slice(-10).reverse().map((l, i) => (
            <li key={i} style={{ marginBottom: 5 }}>
              <b>{l.method}</b> <span style={{ color: "#0ff" }}>{l.url}</span>{" "}
              {l.status && <span style={{ color: "#ffd700" }}>→ {l.status}</span>}{" "}
              {l.error && <span style={{ color: "#e66" }}>[{l.error}]</span>}
              <br />
              <span style={{ color: "#aaa" }}>{l.time}</span>
            </li>
          ))}
        </ol>
      </div>
      <h3>What to Check:</h3>
      <ol>
        <li>Does the API base above start with <code>https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001</code> exactly?</li>
        <li>If not: update <b>.env</b> in <code>royaltree_frontend/</code> to set <br />
            <code>REACT_APP_BACKEND_BASE_URL=https://vscode-internal-8323-beta.beta01.cloud.kavia.ai:3001</code>
        </li>
        <li>After any change: Stop and restart the frontend (<code>npm start</code>).</li>
      </ol>
    </div>
  );
}
