import dotenv from "dotenv";

dotenv.config();


import express, {
  Request,
  Response,
} from "express";



import http from "http";

import cors from "cors";

import { Server } from "socket.io";

/**
 * COINBASE CLIENT
 */
import "./coinbase/coinbaseClient";

import {
  coinbaseSocket,
} from "./coinbase/coinbaseClient";

/**
 * USER SESSION MANAGEMENT
 */
import {
  subscribeUserToProduct,
  unsubscribeUserFromProduct,
  getUserSubscriptions,
  removeUserSession,
  printAllSessions,
} from "./socket/userSessions";

/**
 * GLOBAL SUBSCRIPTION MANAGER
 */
import {
  addGlobalSubscription,
  removeGlobalSubscription,
  isProductGloballySubscribed,
  getProductSubscriptionCount,
  printGlobalSubscriptions,
} from "./coinbase/subscriptionManager";

/**
 * MARKET BROADCASTER
 */
import {
  startMarketBroadcaster,
} from "./socket/marketBroadcaster";

/**
 * EXPRESS APP
 */
const app = express();

/**
 * MIDDLEWARES
 */
app.use(cors());

/**
 * HTTP SERVER
 */
const server = http.createServer(app);

/**
 * SOCKET.IO SERVER
 */
const io = new Server(server, {
  cors: {
    origin:
  process.env.CLIENT_URL,
  },

  perMessageDeflate: true,
});

/**
 * HEALTH CHECK ROUTE
 */
app.get(
  "/",
  (_req: Request, res: Response) => {

    res.send(
      "Trading Server Running"
    );
  }
);

/**
 * SOCKET CONNECTION
 */
io.on("connection", (socket) => {

  console.log(
    `User Connected: ${socket.id}`
  );

  /**
   * SUBSCRIBE EVENT
   */
  socket.on(
    "subscribe-product",
    (product: string) => {

      try {

        /**
         * STORE USER SUBSCRIPTION
         */
        subscribeUserToProduct(
          socket.id,
          product
        );

        /**
         * CHECK IF PRODUCT
         * ALREADY SUBSCRIBED
         */
        const alreadySubscribed =
          isProductGloballySubscribed(
            product
          );

        /**
         * INCREASE GLOBAL COUNT
         */
        addGlobalSubscription(
          product
        );

        /**
         * ONLY FIRST USER
         * SHOULD SUBSCRIBE
         * TO COINBASE
         */
        if (!alreadySubscribed) {

coinbaseSocket.send(
  JSON.stringify({
    type: "subscribe",
    channels: [
      {
        name: "level2_batch",
        product_ids: [product],
      },
      {
        name: "ticker",
        product_ids: [product],
      },
    ],
  })
);

          console.log(
            `Coinbase subscribed to ${product}`
          );
        }

        /**
         * SEND UPDATED SUBSCRIPTIONS
         */
        socket.emit(
          "subscriptions-updated",
          getUserSubscriptions(
            socket.id
          )
        );

        console.log(
          `User ${socket.id} subscribed to ${product}`
        );

        /**
         * DEBUG
         */
        printAllSessions();

        printGlobalSubscriptions();

      } catch (error: any) {

        console.log(
          "Subscription Error:",
          error.message
        );

        socket.emit(
          "subscription-error",
          error.message
        );
      }
    }
  );

  /**
   * UNSUBSCRIBE EVENT
   */
  socket.on(
    "unsubscribe-product",
    (product: string) => {

      try {

        /**
         * REMOVE USER SUBSCRIPTION
         */
        unsubscribeUserFromProduct(
          socket.id,
          product
        );

        /**
         * REMOVE GLOBAL COUNT
         */
        removeGlobalSubscription(
          product
        );

        /**
         * CHECK REMAINING USERS
         */
        const remainingUsers =
          getProductSubscriptionCount(
            product
          );

        /**
         * ONLY UNSUBSCRIBE
         * IF NO USERS LEFT
         */
        if (remainingUsers === 0) {

coinbaseSocket.send(
  JSON.stringify({
    type: "unsubscribe",
    channels: [
      {
        name: "level2_batch",
        product_ids: [product],
      },
      {
        name: "ticker",
        product_ids: [product],
      },
    ],
  })
);

          console.log(
            `Coinbase unsubscribed from ${product}`
          );
        }

        /**
         * SEND UPDATED SUBSCRIPTIONS
         */
        socket.emit(
          "subscriptions-updated",
          getUserSubscriptions(
            socket.id
          )
        );

        console.log(
          `User ${socket.id} unsubscribed from ${product}`
        );

        /**
         * DEBUG
         */
        printAllSessions();

        printGlobalSubscriptions();

      } catch (error: any) {

        console.log(
          "Unsubscribe Error:",
          error.message
        );

        socket.emit(
          "subscription-error",
          error.message
        );
      }
    }
  );

  /**
   * GET CURRENT SUBSCRIPTIONS
   */
  socket.on(
    "get-subscriptions",
    () => {

      socket.emit(
        "subscriptions-updated",
        getUserSubscriptions(
          socket.id
        )
      );
    }
  );

  /**
   * DISCONNECT EVENT
   */
  socket.on("disconnect", () => {

    console.log(
      `User Disconnected: ${socket.id}`
    );

    /**
     * GET USER PRODUCTS
     */
    const userProducts =
      getUserSubscriptions(
        socket.id
      );

    /**
     * REMOVE GLOBAL COUNTS
     */
    userProducts.forEach(
      (product) => {

        removeGlobalSubscription(
          product
        );

        const remainingUsers =
          getProductSubscriptionCount(
            product
          );

        /**
         * UNSUBSCRIBE IF
         * NO USERS LEFT
         */
        if (remainingUsers === 0) {

coinbaseSocket.send(
          JSON.stringify({
            type: "unsubscribe",
            channels: [
              {
                name: "level2_batch",
                product_ids: [product],
              },
              {
                name: "ticker",
                product_ids: [product],
              },
            ],
          })
        );

          console.log(
            `Coinbase unsubscribed from ${product}`
          );
        }
      }
    );

    /**
     * REMOVE USER SESSION
     */
    removeUserSession(
      socket.id
    );

    /**
     * DEBUG
     */
    printAllSessions();

    printGlobalSubscriptions();
  });
});

/**
 * START MARKET BROADCASTER
 */
startMarketBroadcaster(io);

/**
 * SERVER PORT
 */
const PORT =
  process.env.PORT || 5000;

/**
 * START SERVER
 */
server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});