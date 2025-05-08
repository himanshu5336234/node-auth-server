const { OrderBookSnapshot, OrderBookUpdate } = require('../helpers/protobuf');
const redisManager = require('./redis');
const logger = require('../helpers/logger');

class OrderBookManager {
  constructor(symbol) {
    this.symbol = symbol;
    this.sequence = 0;
  }

  async processUpdate(updateBuffer) {
    const update = OrderBookUpdate.decode(updateBuffer);
    
    if (update.sequence <= this.sequence) {
      logger.debug(`Stale update for ${this.symbol}`);
      return false;
    }

    await redisManager.processOrderBookUpdate(this.symbol, update);
    this.sequence = update.sequence;
    return true;
  }

  async getSnapshot() {
    const [bids, asks, meta] = await redisManager.getOrderBook(this.symbol);
    return OrderBookSnapshot.encode({
      symbol: this.symbol,
      sequence: this.sequence,
      timestamp: BigInt(Date.now()),
      bids,
      asks
    }).finish();
  }
}

module.exports = OrderBookManager;