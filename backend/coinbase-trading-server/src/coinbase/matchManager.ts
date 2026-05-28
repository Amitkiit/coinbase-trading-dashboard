export interface MatchTrade {
  product_id: string;
  price: string;
  size: string;
  side: string;
  time: string;
}

const MAX_MATCHES = 100;

export const recentMatches:
  MatchTrade[] = [];

/**
 * PROCESS TICKER
 */
export const processMatch = (
  message: any
) => {

  recentMatches.unshift({
    product_id:
      message.product_id,
    price: message.price,
    size:
      message.last_size || "0",
    side:
      message.side || "buy",
    time:
      message.time ||
      new Date().toISOString(),
  });

  /**
   * LIMIT MEMORY
   */
  if (
    recentMatches.length >
    MAX_MATCHES
  ) {
    recentMatches.pop();
  }
};

/**
 * GET RECENT MATCHES
 */
export const getRecentMatches =
  () => {

    return recentMatches;
  };