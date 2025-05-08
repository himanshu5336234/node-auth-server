const redis = require('redis');

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379, // Default Redis port
  // Uncomment the following line if your Redis requires a password
  // password: 'your_redis_password',
});

redisClient.on('connect', () => {
  console.log('Connected to Redis successfully');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err.message);
});

redisClient.connect(); // Ensure the client is connected

module.exports = redisClient;
