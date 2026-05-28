import {
  processMatch,
  getRecentMatches,
} from "./matchManager";

describe(
  "Match Manager",
  () => {

    test(
      "should store trade",
      () => {

        processMatch({
          product_id:
            "BTC-USD",

          price:
            "50000",

          last_size:
            "0.5",

          side: "buy",

          time:
            new Date().toISOString(),
        });

        const matches =
          getRecentMatches();

        expect(
          matches.length
        ).toBeGreaterThan(
          0
        );
      }
    );
  }
);