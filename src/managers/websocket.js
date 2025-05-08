const WebSocket = require('ws');
const OrderBookManager = require('./orderbook');
const logger = require('../helpers/logger');

class WSServer {
  constructor(port) {
    this.server = new WebSocket.Server({ port });
    this.subscriptions = new Map();
    this.setupHandlers();
  }

  setupHandlers() {
    this.server.on('connection', (ws, req) => {
      const clientId = req.headers['x-client-id'];
      logger.info(`Client connected: ${clientId}`);
      
      ws.on('message', async (message) => {
        try {
          const { action, symbol } = JSON.parse(message);
          
          if (action === 'subscribe') {
            await this.handleSubscribe(clientId, symbol, ws);
          }
        } catch (err) {
          logger.error('Message handling error:', err);
        }
      });
      
      ws.on('close', () => {
        this.handleUnsubscribe(clientId);
      });
    });
  }

  async handleSubscribe(clientId, symbol, ws) {
    const obm = new OrderBookManager(symbol);
    
    // Send initial snapshot
    ws.send(await obm.getSnapshot());
    
    // Track subscription
    this.subscriptions.set(clientId, { symbol, ws });
  }

  handleUnsubscribe(clientId) {
    this.subscriptions.delete(clientId);
  }

  broadcast(symbol, message) {
    this.subscriptions.forEach((sub, clientId) => {
      if (sub.symbol === symbol && sub.ws.readyState === WebSocket.OPEN) {
        sub.ws.send(message);
      }
    });
  }
}

module.exports = WSServer;