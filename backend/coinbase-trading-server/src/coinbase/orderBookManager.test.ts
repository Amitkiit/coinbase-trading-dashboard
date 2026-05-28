import {
  processSnapshot,
  processL2Update,
  getOrderBook,
} from "./orderBookManager";

describe(
  "OrderBook Manager",
  () => {

    test(
      "should process snapshot",
      () => {

        processSnapshot({
          product_id:
            "BTC-USD",

          bids: [
            ["50000", "1"],
          ],

          asks: [
            ["51000", "2"],
          ],
        });

        const book =
          getOrderBook(
            "BTC-USD"
          );

        expect(
          book.bids[
            "50000"
          ]
        ).toBe("1");

        expect(
          book.asks[
            "51000"
          ]
        ).toBe("2");
      }
    );

    test(
      "should process l2update",
      () => {

        processL2Update({
          product_id:
            "BTC-USD",

          changes: [
            [
              "buy",
              "50000",
              "5",
            ],
          ],
        });

        const book =
          getOrderBook(
            "BTC-USD"
          );

        expect(
          book.bids[
            "50000"
          ]
        ).toBe("5");
      }
    );
  }
);