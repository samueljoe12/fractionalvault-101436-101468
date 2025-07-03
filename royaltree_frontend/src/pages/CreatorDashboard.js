import React, { useContext, useEffect, useState } from "react";
import { apiGet } from "../api";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export default function CreatorDashboard() {
  const { user } = useContext(UserContext);
  const [assets, setAssets] = useState([]);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    if (user && user.token) {
      apiGet("/creator/assets", {}, user.token).then(setAssets).catch(() => setAssets([]));
      apiGet("/creator/earnings", {}, user.token).then(setEarnings).catch(() => setEarnings(null));
    }
  }, [user]);

  return (
    <section>
      <h2>Creator Dashboard</h2>
      <Link to="/creator/upload">+ Upload new asset</Link>
      <h3>Your Assets</h3>
      <ul>
        {assets.map(a => (
          <li key={a.id}>
            <Link to={`/assets/${a.id}`}>{a.title}</Link> ({a.status}) - {a.shares_sold}/{a.total_shares} sold
          </li>
        ))}
      </ul>
      <h3>Earnings</h3>
      {earnings ? (<div>
        Total sales: {earnings.total_sales}<br/>
        Total royalties: {earnings.total_royalties}
      </div>) : "Loading..."}
    </section>
  );
}
