const WebSocket = require('ws');
const { OrderBookUpdate } = require('../helpers/protobuf');
const redisManager = require('../managers/redis');
const logger = require('../helpers/logger');

class BinanceService {
  constructor(symbols) {
    this.symbols = symbols;
    this.wsConnections = new Map();
  }

  connectAll() {
    this.symbols.forEach((symbol) => {
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);

      ws.on('open', () => {
        logger.info(`Connected to Binance WS for ${symbol}`);
      });

      ws.on('message', async (data) => {
        const update = this.transformMessage(symbol, JSON.parse(data));
        const buffer = OrderBookUpdate.encode(update).finish();
        await redisManager.processOrderBookUpdate(symbol, update);
      });

      this.wsConnections.set(symbol, ws);
    });
  }

  transformMessage(symbol, binanceData) {
    return {
      symbol,
      sequence: BigInt(binanceData.lastUpdateId),
      bids: binanceData.bids.map(([price, quantity]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      })),
      asks: binanceData.asks.map(([price, quantity]) => ({
        price: parseFloat(price),
        quantity: parseFloat(quantity),
      })),
    };
  }
}

module.exports = BinanceService;
