export interface OrderBook {
  bids: Record<string, string>;
  asks: Record<string, string>;
}

export interface MatchTrade {
  product_id: string;
  price: string;
  size: string;
  side: string;
  time: string;
}