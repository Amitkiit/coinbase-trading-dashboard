import {
  processSnapshot,
  processL2Update,
} from "./orderBookManager";

import {
  processMatch,
} from "./matchManager";

import {
  updateSystemStatus,
} from "./systemStatus";

import {
  markDirtyProduct,
} from "../socket/dirtyProducts";

export const handleCoinbaseMessage = (
  message: any
) => {

  /**
   * IGNORE HEARTBEAT
   */
  if (
    message.type ===
    "heartbeat"
  ) {
    return;
  }

  switch (
    message.type
  ) {

    /**
     * SUBSCRIPTIONS
     */
    case "subscriptions":

      updateSystemStatus(
        message
      );

      console.log(
        "System Status Updated"
      );

      break;

    /**
     * SNAPSHOT
     */
    case "snapshot":

      processSnapshot(
        message
      );

      markDirtyProduct(
        message.product_id
      );

      break;

    /**
     * L2 UPDATE
     */
    case "l2update":

      processL2Update(
        message
      );

      markDirtyProduct(
        message.product_id
      );

      break;

    /**
     * LIVE TRADES
     */
    case "ticker":

      processMatch(
        message
      );

      break;

    /**
     * ERROR
     */
    case "error":

      console.log(
        "Coinbase Error:",
        message.message
      );

      break;

    default:

      break;
  }
};