// TypeScript types for Coinbase API and trading data

export interface CoinbaseMessage {
  type: string;
  [key: string]: any;
}

export interface CoinbaseSubscription {
  productId: string;
  channels: string[];
  subscribedAt: Date;
}

export interface OrderBookLevel {
  price: number;
  size: number;
}

export interface OrderBook {
  productId: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  sequence: number;
  lastUpdated: Date;
}

export interface Trade {
  id: string;
  productId: string;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  timestamp: Date;
}

export interface Ticker {
  productId: string;
  price: number;
  open24h: number;
  volume24h: number;
  low24h: number;
  high24h: number;
  bid: number;
  ask: number;
  lastSize: number;
  bestBid: number;
  bestAsk: number;
}

export interface Product {
  id: string;
  baseCurrency: string;
  quoteCurrency: string;
  baseMinSize: number;
  baseMaxSize: number;
  quoteIncrement: number;
  displayName: string;
  status: string;
  marginEnabled: boolean;
  postOnly: boolean;
  limitOnly: boolean;
  cancelOnly: boolean;
}

export interface Order {
  id: string;
  productId: string;
  side: 'buy' | 'sell';
  price: number;
  size: number;
  type: 'market' | 'limit';
  status: string;
  createdAt: Date;
}
