import dotenv from "dotenv";

dotenv.config();

import WebSocket from "ws";

import {
  COINBASE_WS_URL,
} from "../config/constants";

import {
  handleCoinbaseMessage,
} from "./messageHandler";

import {
  getAllGlobalSubscriptions,
} from "./subscriptionManager";

/**
 * GLOBAL SOCKET
 */
let coinbaseSocket: WebSocket;

/**
 * HEARTBEAT TIMER
 */
let heartbeatTimeout:
  NodeJS.Timeout;

/**
 * CONNECT TO COINBASE
 */
const connectCoinbase = () => {

  console.log(
    "Connecting to Coinbase..."
  );

  coinbaseSocket =
    new WebSocket(
      COINBASE_WS_URL
    );

  /**
   * CONNECTED
   */
  coinbaseSocket.on(
    "open",
    () => {

      console.log(
        "Connected To Coinbase"
      );

      /**
       * RESUBSCRIBE PRODUCTS
       */
      const products =
        getAllGlobalSubscriptions();

      if (products.length > 0) {

        coinbaseSocket.send(
  JSON.stringify({
    type: "subscribe",
    channels: [
      {
        name: "level2_batch",
        product_ids: products,
      },
      {
        name: "ticker",
        product_ids: products,
      },
    ],
  })
);

        console.log(
          "Re-subscribed products:",
          products
        );
      }
    }
  );

  /**
   * RECEIVE MESSAGE
   */
  coinbaseSocket.on(
    "message",
    (data) => {

      try {

        /**
         * RESET HEARTBEAT
         */
        resetHeartbeat();

        const message =
          JSON.parse(
            data.toString()
          );

        handleCoinbaseMessage(
          message
        );

      } catch (error) {

        console.log(
          "Message Parse Error:",
          error
        );
      }
    }
  );

  /**
   * ERROR
   */
  coinbaseSocket.on(
    "error",
    (error) => {

      console.log(
        "Coinbase Error:",
        error
      );
    }
  );

  /**
   * CLOSED
   */
  coinbaseSocket.on(
    "close",
    () => {

      console.log(
        "Coinbase Disconnected"
      );

      reconnectCoinbase();
    }
  );
};

/**
 * RECONNECT LOGIC
 */
const reconnectCoinbase = () => {

  console.log(
    "Reconnecting in 5 seconds..."
  );

  setTimeout(() => {

    connectCoinbase();

  }, 5000);
};

/**
 * HEARTBEAT MONITOR
 */
const resetHeartbeat = () => {

  clearTimeout(
    heartbeatTimeout
  );

  heartbeatTimeout =
    setTimeout(() => {

      console.log(
        "Heartbeat timeout. Reconnecting..."
      );

      coinbaseSocket.terminate();

    }, 30000);
};

/**
 * INITIAL CONNECT
 */
connectCoinbase();

/**
 * EXPORT SOCKET
 */
export {
  coinbaseSocket,
};