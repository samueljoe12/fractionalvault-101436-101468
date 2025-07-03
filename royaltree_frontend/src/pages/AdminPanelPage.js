import React, { useContext, useState, useEffect } from "react";
import { apiGet, apiPost } from "../api";
import { UserContext } from "../App";

export default function AdminPanelPage() {
  const { user } = useContext(UserContext);
  const [pendingAssets, setPendingAssets] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.token) {
      apiGet("/admin/assets/pending", {}, user.token).then(setPendingAssets);
      apiGet("/admin/panel/disputes", {}, user.token).then(setDisputes);
    }
  }, [user]);

  async function handleAssetStatus(id, status) {
    try {
      await apiPost(`/admin/assets/${id}/status`, { asset_status: status }, user.token);
      setMessage("Asset status updated.");
      setPendingAssets(pendingAssets.filter(pa => pa.id !== id));
    } catch (e) {
      setMessage("Failed: " + (e.message || e));
    }
  }

  async function handleResolveDispute(dispute_id) {
    const resolution = prompt("Describe the resolution:");
    if (!resolution) return;
    try {
      await apiPost(`/admin/panel/disputes/resolve`, { dispute_id, resolution }, user.token);
      setMessage("Dispute resolved.");
      setDisputes(disputes.filter(d => d.id !== dispute_id));
    } catch (e) {
      setMessage("Failed: " + (e.message || e));
    }
  }

  return (
    <section>
      <h2>Admin Panel</h2>
      {message && <div>{message}</div>}
      <h3>Asset Approvals</h3>
      <ul>
        {pendingAssets.map(a => (
          <li key={a.id}>
            {a.title} - {a.status} <button onClick={() => handleAssetStatus(a.id, "approved")}>Approve</button>
            <button onClick={() => handleAssetStatus(a.id, "rejected")}>Reject</button>
          </li>
        ))}
      </ul>
      <h3>Dispute Moderation</h3>
      <ul>
        {disputes.map(d => (
          <li key={d.id || d.asset_id}>
            Asset #{d.asset_id} - {d.reason}
            <button onClick={() => handleResolveDispute(d.id)}>Resolve</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
