import { memo } from "react";

interface Props {
  subscriptions: string[];
  onSubscribe: (product: string) => void;
  onUnsubscribe: (product: string) => void;
}

const PRODUCTS = ["BTC-USD", "ETH-USD", "XRP-USD", "LTC-USD"];
const SubscribePanel = ({
  subscriptions,
  onSubscribe,
  onUnsubscribe,
}: Props) => {
  return (
    <div
  className="p-4 glass-card"
  style={{
        borderRadius: "20px",
        border: "1px solid #30363d",
      }}
    >
      <h2 className="mb-4 text-center">Market Subscriptions</h2>

      <div className="row">
        {PRODUCTS.map((product) => {
          const subscribed = subscriptions.includes(product);

          return (
            <div key={product} className="col-md-6 col-xl-3 mb-3">
              <div
                className="p-3 d-flex justify-content-between align-items-center"
                style={{
                  background: "#0d1117",
                  borderRadius: "15px",
                  border: "1px solid #30363d",
                }}
              >
                <div>
                  <h5>{product}</h5>

                  <small
                    style={{
                      color: subscribed ? "#3fb950" : "#8b949e",
                    }}
                  >
                    {subscribed ? "LIVE" : "OFFLINE"}
                  </small>
                </div>
                <button
                  className={`btn ${subscribed ? "btn-danger" : "btn-success"}`}
                  onClick={() => {
                    if (subscribed) {
                      onUnsubscribe(product);
                    } else {
                      onSubscribe(product);
                    }
                  }}
                >
                  {subscribed ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(
  SubscribePanel
);
