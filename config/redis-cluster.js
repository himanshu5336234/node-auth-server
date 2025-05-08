module.exports = {
    nodes: [
      { host: process.env.REDIS_HOST || '127.0.0.1', port: 6379 }
    ],
    options: {
      password: process.env.REDIS_PASSWORD,
      tls: process.env.REDIS_TLS === 'true'
    }
  };