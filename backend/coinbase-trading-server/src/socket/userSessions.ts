import { PRODUCTS } from "../config/constants";

/**
 * Map Structure:
 *
 * socket.id => Set(products)
 *
 * Example:
 *
 * {
 *   "socket123" => Set("BTC-USD", "ETH-USD")
 * }
 */

export const userSubscriptions =
  new Map<string, Set<string>>();

/**
 * Create user session
 */
export const createUserSession = (
  socketId: string
) => {

  if (!userSubscriptions.has(socketId)) {
    userSubscriptions.set(
      socketId,
      new Set()
    );
  }
};

/**
 * Subscribe user to product
 */
export const subscribeUserToProduct = (
  socketId: string,
  product: string
) => {

  // Validate product
  if (!PRODUCTS.includes(product)) {
    throw new Error(
      `Invalid product: ${product}`
    );
  }

  createUserSession(socketId);

  userSubscriptions
    .get(socketId)
    ?.add(product);
};

/**
 * Unsubscribe user from product
 */
export const unsubscribeUserFromProduct = (
  socketId: string,
  product: string
) => {

  userSubscriptions
    .get(socketId)
    ?.delete(product);
};

/**
 * Get all user subscriptions
 */
export const getUserSubscriptions = (
  socketId: string
): string[] => {

  return Array.from(
    userSubscriptions.get(socketId) || []
  );
};

/**
 * Check if user subscribed
 */
export const isUserSubscribed = (
  socketId: string,
  product: string
): boolean => {

  return (
    userSubscriptions
      .get(socketId)
      ?.has(product) || false
  );
};

/**
 * Remove user session
 */
export const removeUserSession = (
  socketId: string
) => {

  userSubscriptions.delete(socketId);
};

/**
 * Debug helper
 */
export const printAllSessions = () => {

  console.log(
    "========== USER SESSIONS =========="
  );

  userSubscriptions.forEach(
    (products, socketId) => {

      console.log(
        socketId,
        Array.from(products)
      );
    }
  );
};