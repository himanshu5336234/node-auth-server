const protobuf = require('protobufjs');
const path = require('path');

let root;
const types = {};

async function loadProtos() {
  root = await protobuf.load(path.join(__dirname, '../protos/orderbook.proto'));
  root.resolveAll();
  
  types.OrderBookSnapshot = root.lookupType('OrderBookSnapshot');
  types.OrderBookUpdate = root.lookupType('OrderBookUpdate');
}

module.exports = {
  ...types,
  loadProtos
};