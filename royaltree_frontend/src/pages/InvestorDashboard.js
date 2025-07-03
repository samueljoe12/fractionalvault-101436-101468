import React, { useContext, useEffect, useState } from "react";
import { apiGet } from "../api";
import { UserContext } from "../App";

export default function InvestorDashboard() {
  const { user } = useContext(UserContext);
  const [assets, setAssets] = useState([]);
  const [earnings, setEarnings] = useState(null);

  useEffect(() => {
    if (user && user.token) {
      apiGet("/investor/assets", {}, user.token).then(setAssets).catch(() => setAssets([]));
      apiGet("/investor/earnings", {}, user.token).then(setEarnings).catch(() => setEarnings(null));
    }
  }, [user]);

  return (
    <section>
      <h2>Investor Dashboard</h2>
      <h3>Your Investments</h3>
      <ul>
        {assets.map(a => (
          <li key={a.id}>
            {a.title} - Shares: {a.shares_owned} - Earnings: {a.earnings}
          </li>
        ))}
      </ul>
      <h3>Earnings</h3>
      {earnings ? (
        <div>
          Total royalties: {earnings.total_royalties} <br />
          Total gains: {earnings.total_gains}
        </div>
      ) : "Loading..."}
    </section>
  );
}
