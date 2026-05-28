import { memo, useMemo } from "react";

import type {
  OrderBook,
} from "../types/market.types";

interface Props {
  productId: string;
  book: OrderBook;
}

const PriceView = ({
  productId,
  book,
}: Props) => {

  /**
   * SORTED BIDS
   */
  const bids = useMemo(
    () =>
      Object.entries(book.bids)
        .sort(
          (a, b) =>
            Number(b[0]) -
            Number(a[0])
        )
        .slice(0, 10),

    [book.bids]
  );

  /**
   * SORTED ASKS
   */
  const asks = useMemo(
    () =>
      Object.entries(book.asks)
        .sort(
          (a, b) =>
            Number(a[0]) -
            Number(b[0])
        )
        .slice(0, 10),

    [book.asks]
  );

  /**
   * BEST BID
   */
  const bestBid =
    bids.length > 0
      ? Number(bids[0][0])
      : 0;

  /**
   * BEST ASK
   */
  const bestAsk =
    asks.length > 0
      ? Number(asks[0][0])
      : 0;

  /**
   * SPREAD
   */
  const spread =
    (
      bestAsk - bestBid
    ).toFixed(2);

  /**
   * MID PRICE
   */
  const midPrice =
    (
      (bestBid + bestAsk) /
      2
    ).toFixed(2);

  return (
    <div
      className="p-4 h-100 glass-card"
      style={{
        borderRadius: "20px",
      }}
    >

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2
            style={{
              color: "#58a6ff",
              fontWeight: "bold",
            }}
          >
            {productId}
          </h2>

          <div className="market-status-live">
            <span className="live-dot"></span>
            LIVE MARKET
          </div>
        </div>

        <div className="text-end">

          <div className="mid-price">
            ${midPrice}
          </div>

          <small
            style={{
              color: "#8b949e",
            }}
          >
            Mid Price
          </small>
        </div>
      </div>

      {/* MARKET STATS */}
      <div className="row mb-4">

        <div className="col-4">
          <div className="market-stat-card bid-card">

            <div className="market-label">
              Best Bid
            </div>

            <div className="market-value bid-text">
              ${bestBid}
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="market-stat-card ask-card">

            <div className="market-label">
              Best Ask
            </div>

            <div className="market-value ask-text">
              ${bestAsk}
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="market-stat-card spread-card">

            <div className="market-label">
              Spread
            </div>

            <div className="market-value spread-text">
              ${spread}
            </div>
          </div>
        </div>
      </div>

      {/* ORDERBOOK */}
      <div className="row">

        {/* BIDS */}
        <div className="col-6">

          <h4
            className="mb-3 bid-text"
          >
            Bids
          </h4>

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {bids.map(
              ([price, size]) => (

                <div
                  key={price}
                  className="d-flex justify-content-between mb-2 orderbook-row"
                >
                  <span className="bid-text">
                    {price}
                  </span>

                  <span>
                    {size}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ASKS */}
        <div className="col-6">

          <h4
            className="mb-3 ask-text"
          >
            Asks
          </h4>

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {asks.map(
              ([price, size]) => (

                <div
                  key={price}
                  className="d-flex justify-content-between mb-2 orderbook-row"
                >
                  <span className="ask-text">
                    {price}
                  </span>

                  <span>
                    {size}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(
  PriceView
);