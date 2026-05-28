import dotenv from "dotenv";

dotenv.config();

import { Server } from "socket.io";

import {
  getOrderBook,
} from "../coinbase/orderBookManager";

import {
  getRecentMatches,
} from "../coinbase/matchManager";

import {
  getSystemStatus,
} from "../coinbase/systemStatus";

import {
  userSubscriptions,
} from "./userSessions";

import {
  dirtyProducts,
  clearDirtyProduct,
} from "./dirtyProducts";

/**
 * START MARKET BROADCASTER
 */
export const startMarketBroadcaster = (
  io: Server
) => {

  setInterval(() => {

    io.sockets.sockets.forEach(
      (socket) => {

        /**
         * SOCKET ACTIVE?
         */
        if (
          !socket.connected
        ) {
          return;
        }

        const subscriptions =
          userSubscriptions.get(
            socket.id
          );

        if (
          !subscriptions
        ) {
          return;
        }

        /**
         * SEND ONLY
         * CHANGED PRODUCTS
         */
        Array.from(
          subscriptions
        ).forEach(
          (productId) => {

            if (
              !dirtyProducts.has(
                productId
              )
            ) {
              return;
            }

            socket.emit(
              "orderbook-update",
              {
                productId,

                book:
                  getOrderBook(
                    productId
                  ),
              }
            );

            clearDirtyProduct(
              productId
            );
          }
        );

        /**
         * RECENT MATCHES
         */
        socket.emit(
          "recent-matches",
          getRecentMatches()
        );

        /**
         * SYSTEM STATUS
         */
        socket.emit(
          "system-status",
          {
            channels:
              getSystemStatus(),
          }
        );
      }
    );

  }, Number(
  process.env
    .BROADCAST_INTERVAL
) || 50);
};