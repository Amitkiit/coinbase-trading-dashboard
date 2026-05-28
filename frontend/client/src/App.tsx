import "./App.css";

import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { socket } from "./socket/socket";

import SubscribePanel from "./components/SubscribePanel";
import PriceView from "./components/PriceView";
import MatchView from "./components/MatchView";
import SystemStatus from "./components/SystemStatus";

import type { OrderBook, MatchTrade } from "./types/market.types";
interface Channel {
  name: string;
  product_ids?: string[];
}
function App() {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  const [orderBooks, setOrderBooks] = useState<Record<string, OrderBook>>({});

  const [matches, setMatches] = useState<MatchTrade[]>([]);

  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    socket.emit("get-subscriptions");
    socket.on("subscriptions-updated", (data: string[]) => {
      setSubscriptions(data);
    });

    socket.on("orderbook-update", (data) => {
      setOrderBooks((prev) => ({
        ...prev,
        [data.productId]: data.book,
      }));
    });
    socket.on("recent-matches", (data) => {
      setMatches(data.slice(0, 50));
    });

    socket.on("system-status", (data) => {
      setChannels(data.channels || []);
    });
    return () => {
      socket.off("subscriptions-updated");
      socket.off("orderbook-update");
      socket.off("recent-matches");
      socket.off("system-status");
    };
  }, []);

  const subscribe = (product: string) => {
    socket.emit("subscribe-product", product);
  };
  const unsubscribe = (product: string) => {
    socket.emit("unsubscribe-product", product);
  };

  return (
    <div className="container-fluid p-4">
      <div className="mb-4 text-center">
        <h1 className="dashboard-title">Coinbase Trading Dashboard</h1>

        <p
          style={{
            color: "#8b949e",
            fontSize: "1.1rem",
          }}
        >
          Real-time crypto market terminal
        </p>
      </div>
      <SubscribePanel
        subscriptions={subscriptions}
        onSubscribe={subscribe}
        onUnsubscribe={unsubscribe}
      />
      <div className="row mt-4">
        <div className={subscriptions.length <= 1 ? "col-lg-12" : "col-lg-8"}>
          <div className="row">
            {subscriptions.map((product) => (
              <div key={product} className="col-xl-6 mb-4">
                <PriceView
                  productId={product}
                  book={
                    orderBooks[product] || {
                      bids: {},
                      asks: {},
                    }
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className={subscriptions.length <= 1 ? "d-none" : "col-lg-4"}>
          <MatchView matches={matches} />

          <div className="mt-4">
            <SystemStatus channels={channels} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
