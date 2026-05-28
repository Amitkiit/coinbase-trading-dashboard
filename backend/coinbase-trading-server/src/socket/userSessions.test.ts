import {
  subscribeUserToProduct,
  unsubscribeUserFromProduct,
  getUserSubscriptions,
} from "./userSessions";

describe(
  "User Sessions",
  () => {

    test(
      "should subscribe user",
      () => {

        subscribeUserToProduct(
          "socket1",
          "BTC-USD"
        );

        const products =
          getUserSubscriptions(
            "socket1"
          );

        expect(
          products.includes(
            "BTC-USD"
          )
        ).toBe(true);
      }
    );

    test(
      "should unsubscribe user",
      () => {

        unsubscribeUserFromProduct(
          "socket1",
          "BTC-USD"
        );

        const products =
          getUserSubscriptions(
            "socket1"
          );

        expect(
          products.includes(
            "BTC-USD"
          )
        ).toBe(false);
      }
    );
  }
);