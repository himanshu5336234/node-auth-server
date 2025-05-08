┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│             │     │              │     │             │
│ Binance     │────▶│ Market Data  │────▶│ Redis       │
│ WebSocket   │     │ Processor    │     │ Cluster     │
│ & REST API  │◀────┤ (Server)     │◀────┤ (Pub/Sub &  │
│             │     │              │     │  OrderBook  │
└─────────────┘     └──────────────┘     └─────────────┘
                             ▲
                             │
                             ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│             │     │              │     │             │
│ Client      │────▶│ API Gateway  │────▶│ WebSocket   │
│ (Web/Mobile)│◀────┤ (Load        │◀────┤ Server      │
│             │     │ Balancer)    │     │ (Broadcast) │
└─────────────┘     └──────────────┘     └─────────────┘
