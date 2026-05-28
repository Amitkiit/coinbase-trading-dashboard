/**
 * GLOBAL PRODUCT SUBSCRIPTIONS
 *
 * Example:
 *
 * BTC-USD => 2
 * ETH-USD => 1
 */
const productSubscriptions =
  new Map<string, number>();

/**
 * ADD GLOBAL SUBSCRIPTION
 */
export const addGlobalSubscription = (
  product: string
) => {

  const currentCount =
    productSubscriptions.get(product) || 0;

  productSubscriptions.set(
    product,
    currentCount + 1
  );
};

/**
 * REMOVE GLOBAL SUBSCRIPTION
 */
export const removeGlobalSubscription = (
  product: string
) => {

  const currentCount =
    productSubscriptions.get(product) || 0;

  /**
   * REMOVE COMPLETELY
   */
  if (currentCount <= 1) {

    productSubscriptions.delete(product);

    return;
  }

  /**
   * DECREASE COUNT
   */
  productSubscriptions.set(
    product,
    currentCount - 1
  );
};

/**
 * CHECK IF PRODUCT
 * ALREADY SUBSCRIBED
 */
export const isProductGloballySubscribed = (
  product: string
): boolean => {

  return productSubscriptions.has(product);
};

/**
 * GET USER COUNT
 */
export const getProductSubscriptionCount = (
  product: string
): number => {

  return (
    productSubscriptions.get(product) || 0
  );
};

/**
 * GET ALL ACTIVE PRODUCTS
 */
export const getAllGlobalSubscriptions =
  (): string[] => {

    return Array.from(
      productSubscriptions.keys()
    );
  };

/**
 * DEBUG GLOBAL SUBSCRIPTIONS
 */
export const printGlobalSubscriptions =
  () => {

    console.log(
      "========== GLOBAL SUBSCRIPTIONS =========="
    );

    productSubscriptions.forEach(
      (count, product) => {

        console.log(
          `${product} => ${count}`
        );
      }
    );
  };