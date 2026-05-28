import { render }
from "@testing-library/react";

import PriceView
from "./PriceView";

describe(
  "PriceView",
  () => {

    test(
      "renders bids and asks",
      () => {

        const book = {
          bids: {
            "50000": "1",
          },

          asks: {
            "51000": "2",
          },
        };

        const {
          getByText,
        } = render(
          <PriceView
            productId="BTC-USD"
            book={book}
          />
        );

        expect(
          getByText(
            /50000/
          )
        ).toBeTruthy();

        expect(
          getByText(
            /51000/
          )
        ).toBeTruthy();
      }
    );
  }
);