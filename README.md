# Coinbase Trading Dashboard — Architecture Diagram

## System Architecture

```txt
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │  (Trading Dashboard) │
                    └──────────┬───────────┘
                               │
                               │ Socket.IO
                               │ Realtime Events
                               ▼
                    ┌──────────────────────┐
                    │    Node.js Backend   │
                    │  Express + Socket.IO │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼

   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
   │ OrderBook      │ │ Match Engine   │ │ User Session   │
   │ Manager        │ │ (Live Trades)  │ │ Manager        │
   └────────────────┘ └────────────────┘ └────────────────┘

             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼

                    ┌──────────────────────┐
                    │ Market Broadcaster   │
                    │ (50ms Realtime Push) │
                    └──────────┬───────────┘
                               │
                               ▼

                    ┌──────────────────────┐
                    │ Coinbase WebSocket   │
                    │ Exchange Feed API    │
                    └──────────────────────┘
```

---

# 1. React Frontend

Handles:

- Subscribe/Unsubscribe UI
- Realtime Orderbook UI
- Live Trades UI
- System Status UI
- Realtime rendering

Technologies:

- React.js
- TypeScript
- Bootstrap
- Socket.IO Client

---

# 2. Socket.IO Layer

Used for realtime communication between:

```txt
Frontend ↔ Backend
```

Responsibilities:

- Send subscriptions
- Receive live market updates
- Receive live trades
- Receive system status

---

# 3. Node.js Backend

Core realtime server.

Responsibilities:

- Connect Coinbase feed
- Manage websocket users
- Process market data
- Broadcast realtime updates
- Handle subscriptions

Technologies:

- Node.js
- Express.js
- Socket.IO
- TypeScript

---

# 4. OrderBook Manager

Processes:

- snapshot messages
- l2update messages

Stores:

- bids
- asks
- price levels

Maintains realtime market depth.

---

# 5. Match Engine

Processes live trade data.

Stores:

- price
- size
- side
- timestamp

Displayed inside Match View.

---

# 6. User Session Manager

Tracks user subscriptions.

Example:

```txt
socket.id → products
```

Example:

```txt
User A → BTC
User B → ETH
User C → BTC + XRP
```

---

# 7. Market Broadcaster

Broadcasts updates every:

```txt
50ms
```

Broadcasts:

- orderbooks
- trades
- system status
- subscriptions

to connected frontend users.

---

# 8. Coinbase WebSocket API

External market data provider.

Channels used:

- level2_batch
- ticker

Provides:

- realtime prices
- orderbook updates
- live trades

---

# Frontend Component Architecture

```txt
App.tsx
   │
   ├── SubscribePanel
   │      └── Subscribe / Unsubscribe
   │
   ├── PriceView
   │      └── Realtime Orderbook
   │
   ├── MatchView
   │      └── Live Trades
   │
   └── SystemStatus
          └── Active Channels
```

---

# Backend Processing Flow

```txt
Coinbase Feed
      ↓
coinbaseClient.ts
      ↓
messageHandler.ts
      ↓
 ┌───────────────┬───────────────┬───────────────┐
 ↓               ↓               ↓
OrderBook     MatchManager   SystemStatus
Manager
      ↓
marketBroadcaster.ts
      ↓
Socket.IO
      ↓
Frontend
```

---

# Subscription Flow

```txt
User Click Subscribe
        ↓
Frontend emits socket event
        ↓
Backend receives event
        ↓
Backend subscribes Coinbase
        ↓
Coinbase sends market data
        ↓
Backend processes data
        ↓
Socket.IO broadcasts updates
        ↓
Frontend UI updates live
```

---

# Future Scalable Architecture (Redis Phase)

```txt
Frontend
    ↓
Load Balancer
    ↓
Multiple Node Servers
    ↓
Redis Shared Cache
    ↓
Coinbase Feed
```

Benefits:

- Horizontal scaling
- Multiple backend servers
- Shared realtime cache
- Distributed websocket architecture
- Production-ready infrastructure