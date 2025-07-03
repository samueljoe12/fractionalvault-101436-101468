import React, { useState, useEffect } from "react";
import { apiGet } from "../api";

export default function HealthCheckPage() {
  const [status, setStatus] = useState("unknown");
  useEffect(() => {
    apiGet("/health/db", {}).then(r => setStatus(r.status))
      .catch(() => setStatus("unhealthy"));
  }, []);
  return (
    <div>
      <h2>Health Check (DB)</h2>
      <p>Status: <b>{status}</b></p>
    </div>
  );
}
