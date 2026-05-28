/**
 * TRACK UPDATED PRODUCTS
 */
export const dirtyProducts =
  new Set<string>();

/**
 * MARK PRODUCT DIRTY
 */
export const markDirtyProduct = (
  productId: string
) => {

  dirtyProducts.add(
    productId
  );
};

/**
 * CLEAR DIRTY PRODUCT
 */
export const clearDirtyProduct = (
  productId: string
) => {

  dirtyProducts.delete(
    productId
  );
};