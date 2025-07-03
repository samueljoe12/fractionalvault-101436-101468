import React, { useState, useContext } from "react";
import { apiPostFile } from "../api";
import { UserContext } from "../App";

export default function AssetUploadPage() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("music");
  const [totalShares, setTotalShares] = useState(1000);
  const [pricePerShare, setPricePerShare] = useState(1.0);
  const [royaltyPercent, setRoyaltyPercent] = useState(10.0);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const r = await apiPostFile(
        "/creator/assets",
        {
          title,
          description,
          category,
          total_shares: totalShares,
          price_per_share: pricePerShare,
          royalty_percent: royaltyPercent,
        },
        "file",
        file,
        user.token
      );
      setResult(r);
    } catch (e) {
      setError(e.message || e);
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Upload New Asset</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="music">Music</option>
        <option value="art">Art</option>
        <option value="book">Book</option>
        <option value="design">Design</option>
      </select>
      <input type="number" value={totalShares} onChange={e => setTotalShares(Number(e.target.value))} min={1} required placeholder="Total Shares" />
      <input type="number" value={pricePerShare} onChange={e => setPricePerShare(Number(e.target.value))} min={0.01} step={0.01} required placeholder="Price per Share" />
      <input type="number" value={royaltyPercent} onChange={e => setRoyaltyPercent(Number(e.target.value))} min={0} max={100} step={0.1} required placeholder="Royalty (%)" />
      <input type="file" onChange={e => setFile(e.target.files[0])} required />
      <button type="submit">Upload</button>
      {result && <div>Asset uploaded! ID: {result.id}</div>}
    </form>
  );
}
