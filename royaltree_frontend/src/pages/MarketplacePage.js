import React, { useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

export default function MarketplacePage() {
  const { user } = useContext(UserContext);
  const [assets, setAssets] = useState([]);
  const [buying, setBuying] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("/investor/marketplace", {}, user?.token).then(setAssets);
  }, [user]);

  function handleBuy(assetId) {
    setBuying(v => ({ ...v, [assetId]: true }));
    const shares = prompt("How many shares to buy?");
    if (!shares || isNaN(shares) || Number(shares) <= 0) return;
    apiPost("/investor/assets/buy", { asset_id: assetId, shares }, user?.token)
      .then(res => {
        setMessage("Purchase successful: " + res.shares_bought + " shares bought!");
        navigate("/investor/dashboard");
      })
      .catch(err => setMessage("Purchase failed: " + err.message))
      .finally(() => setBuying(v => ({ ...v, [assetId]: false })));
  }

  return (
    <section>
      <h2>Marketplace</h2>
      <ul>
        {assets.map(a => (
          <li key={a.id}>
            <Link to={`/assets/${a.id}`}>{a.title}</Link> ({a.category}) | Available: {a.shares_available} | Price/share: {a.price_per_share}
            {user && user.role === "investor" &&
            <button onClick={() => handleBuy(a.id)} disabled={!!buying[a.id]}>
              {buying[a.id] ? "Processing..." : "Buy Shares"}
            </button>
            }
          </li>
        ))}
      </ul>
      {message && <div>{message}</div>}
    </section>
  );
}
