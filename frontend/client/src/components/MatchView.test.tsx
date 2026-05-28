import { render }
from "@testing-library/react";

import MatchView
from "./MatchView";

describe(
  "MatchView",
  () => {

    test(
      "renders trades",
      () => {

     const matches = [
  {
    product_id: "BTC-USD",
    price: "50000",
    size: "1",
    side: "buy",
    time: "2025-01-01",
  },
];

        const {
          getByText,
        } = render(
          <MatchView
            matches={
              matches
            }
          />
        );

        expect(
          getByText(
            /BTC-USD/
          )
        ).toBeTruthy();
      }
    );
  }
);