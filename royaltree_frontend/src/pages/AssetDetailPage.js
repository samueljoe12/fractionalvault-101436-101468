import React, { useState, useEffect, useContext } from "react";
import { apiGet, apiPost } from "../api";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

export default function AssetDetailPage() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState("");
  const [dispute, setDispute] = useState("");
  const [disputeStatus, setDisputeStatus] = useState("");

  useEffect(() => {
    apiGet(`/assets/${id}`, {}, user?.token).then(setAsset).catch(e => setError(e.message));
  }, [id, user]);

  async function handleDispute(e) {
    e.preventDefault();
    if (!dispute) return;
    try {
      await apiPost(`/assets/${id}/dispute`, { reason: dispute }, user?.token);
      setDisputeStatus("Dispute submitted!");
    } catch (e) {
      setDisputeStatus("Failed: " + (e.message || e));
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (!asset) return <div>Loading...</div>;

  return (
    <section>
      <h2>Asset: {asset.title}</h2>
      <div>
        <b>Creator:</b> {asset.creator_id}<br/>
        <b>Category:</b> {asset.category}<br/>
        <b>Status:</b> {asset.status}<br/>
        <b>Total Shares:</b> {asset.total_shares}<br/>
        <b>Shares Sold:</b> {asset.shares_sold}<br/>
        <b>Royalty %:</b> {asset.royalty_percent}
      </div>
      {asset.description && <div><b>Description:</b> {asset.description}</div>}
      {asset.file_url && <div>
        <a href={asset.file_url} download>Download Preview</a>
      </div>}
      {user && (
        <form onSubmit={handleDispute} style={{ marginTop: 12 }}>
          <input
            type="text"
            placeholder="Dispute reason"
            value={dispute}
            onChange={e => setDispute(e.target.value)}
          />
          <button type="submit">Submit Dispute</button>
          <span>{disputeStatus}</span>
        </form>
      )}
    </section>
  );
}
