import { memo } from "react";
import type { MatchTrade } from "../types/market.types";

interface Props {
  matches: MatchTrade[];
}

const MatchView = ({ matches }: Props) => {
  return (
    <div
      className="p-4 glass-card"
      style={{
        borderRadius: "20px",
        border: "1px solid #30363d",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#58a6ff" }}>
        Live Trades
      </h2>
      <div
        style={{
          maxHeight: "800px",
          overflowY: "auto",
        }}
      >
        {matches.map((trade, index) => (
          <div
            key={`${trade.time}-${index}`}
            className="mb-2 p-2"
            style={{
              background:
                trade.side === "buy"
                  ? "rgba(63,185,80,0.08)"
                  : "rgba(248,81,73,0.08)",
              borderRadius: "10px",
              color: trade.side === "buy" ? "#3fb950" : "#f85149",
            }}
          >
            <div>
              <strong>{trade.product_id}</strong>
            </div>

            <div>Price: {trade.price}</div>

            <div>Size: {trade.size}</div>

            <small>{trade.time}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(
  MatchView
);
