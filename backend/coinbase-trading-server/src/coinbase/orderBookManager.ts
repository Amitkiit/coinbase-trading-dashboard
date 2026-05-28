const MAX_LEVELS = 20;

interface OrderBook {
  bids: Record<string, string>;
  asks: Record<string, string>;
}

/**
 * ALL ORDERBOOKS
 */
export const orderBooks:
  Record<string, OrderBook> = {};

/**
 * LIMIT ORDERBOOK DEPTH
 */
const trimOrderBook = (
  productId: string
) => {

  const book =
    orderBooks[productId];

  if (!book) return;

  /**
   * SORT BIDS DESC
   */
  const sortedBids =
    Object.entries(book.bids)
      .sort(
        (a, b) =>
          Number(b[0]) -
          Number(a[0])
      )
      .slice(0, MAX_LEVELS);

  /**
   * SORT ASKS ASC
   */
  const sortedAsks =
    Object.entries(book.asks)
      .sort(
        (a, b) =>
          Number(a[0]) -
          Number(b[0])
      )
      .slice(0, MAX_LEVELS);

  book.bids =
    Object.fromEntries(
      sortedBids
    );

  book.asks =
    Object.fromEntries(
      sortedAsks
    );
};

/**
 * SNAPSHOT
 */
export const processSnapshot = (
  message: any
) => {

  const {
    product_id,
    bids,
    asks,
  } = message;

  orderBooks[product_id] = {
    bids: {},
    asks: {},
  };

  /**
   * STORE BIDS
   */
  bids.forEach(
    ([price, size]: [
      string,
      string
    ]) => {

      orderBooks[
        product_id
      ].bids[price] = size;
    }
  );

  /**
   * STORE ASKS
   */
  asks.forEach(
    ([price, size]: [
      string,
      string
    ]) => {

      orderBooks[
        product_id
      ].asks[price] = size;
    }
  );

  trimOrderBook(product_id);

  console.log(
    `Snapshot processed: ${product_id}`
  );
};

/**
 * L2 UPDATE
 */
export const processL2Update = (
  message: any
) => {

  const {
    product_id,
    changes,
  } = message;

  const book =
    orderBooks[product_id];

  if (!book) return;

  changes.forEach(
    ([side, price, size]: [
      string,
      string,
      string
    ]) => {

      const target =
        side === "buy"
          ? book.bids
          : book.asks;

      /**
       * REMOVE LEVEL
       */
      if (
        size === "0"
      ) {

        delete target[
          price
        ];

      } else {

        target[price] =
          size;
      }
    }
  );

  trimOrderBook(product_id);
};

/**
 * GET ORDERBOOK
 */
export const getOrderBook = (
  productId: string
) => {

  return (
    orderBooks[
      productId
    ] || {
      bids: {},
      asks: {},
    }
  );
};