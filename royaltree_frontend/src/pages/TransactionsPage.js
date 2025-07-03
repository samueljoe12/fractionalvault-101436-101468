import React, { useContext, useEffect, useState } from "react";
import { apiGet } from "../api";
import { UserContext } from "../App";

export default function TransactionsPage() {
  const { user } = useContext(UserContext);
  const [txs, setTxs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.token) {
      apiGet("/transactions", {}, user.token).then(setTxs).catch(e => setError(e.message));
    }
  }, [user]);

  return (
    <section>
      <h2>Your Transactions</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {txs.map(tx => (
          <li key={tx.id}>
            [{tx.timestamp}] Asset #{tx.asset_id} | Type: {tx.type} | Shares: {tx.shares} | Price: {tx.price}
          </li>
        ))}
      </ul>
    </section>
  );
}
