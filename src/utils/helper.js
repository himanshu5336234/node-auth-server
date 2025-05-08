function mergeOrderBookUpdates(orderBook, update) {
  // Process Bids
  update.b.forEach(([price, quantity]) => {
    if (quantity === '0') {
      delete orderBook.bids[price]; // Remove price level if quantity is 0
    } else {
      orderBook.bids[price] = quantity; // Update or add price level
    }
  });

  // Process Asks
  update.a.forEach(([price, quantity]) => {
    if (quantity === '0') {
      delete orderBook.asks[price]; // Remove price level if quantity is 0
    } else {
      orderBook.asks[price] = quantity; // Update or add price level
    }
  });

  // Update the lastUpdateId
  orderBook.lastUpdateId = update.u;

  return orderBook;
}

module.exports = { mergeOrderBookUpdates };