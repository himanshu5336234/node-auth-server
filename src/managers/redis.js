// const Redis = require('ioredis');
// const config = require('../config/index');
// const logger = require('../helpers/logger');

// class RedisManager {
//   constructor() {
//     this.clients = new Map();
//     this.initCluster();
//   }

//   initCluster() {
//     this.redis = new Redis.Cluster(config.redis.nodes, {
//       scaleReads: 'slave',
//       redisOptions: config.redis.options
//     });

//     this.redis.on('error', (err) => {
//       logger.error('Redis error:', err);
//     });
//   }

//   async processOrderBookUpdate(symbol, update) {
//     const pipeline = this.redis.pipeline();

//     update.bids.forEach(({ price, quantity }) => {
//       const key = `orderbook:${symbol}:bids`;
//       quantity === 0
//         ? pipeline.zrem(key, price)
//         : pipeline.zadd(key, price, `${price}:${quantity}`);
//     });

//     // Similar for asks...

//     pipeline.hset(`orderbook:${symbol}:meta`, {
//       sequence: update.sequence.toString(),
//       updatedAt: Date.now()
//     });

//     await pipeline.exec();
//   }

//   async getOrderBook(symbol) {
//     const pipeline = this.redis.pipeline();
//     pipeline.zrange(`orderbook:${symbol}:bids`, 0, -1, 'WITHSCORES');
//     pipeline.zrange(`orderbook:${symbol}:asks`, 0, -1, 'WITHSCORES');
//     pipeline.hgetall(`orderbook:${symbol}:meta`);

//     const results = await pipeline.exec();
//     return results.map(([err, result]) => {
//       if (err) throw err;
//       return result;
//     });
//   }
// }

// module.exports = new RedisManager();
