import { render } from "@testing-library/react";
import PriceView from "./PriceView";

describe("PriceView", () => {

  it("renders market labels", () => {

    const mockBook = {
      bids: {
        "50000": "1",
      },
      asks: {
        "51000": "2",
      },
    };

    const { getByText } = render(
      <PriceView
        productId="BTC-USD"
        book={mockBook}
      />
    );

    expect(
      getByText(/Bids/i)
    ).toBeTruthy();

    expect(
      getByText(/Asks/i)
    ).toBeTruthy();

  });

});