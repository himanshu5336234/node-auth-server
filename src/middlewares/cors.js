const cors = require('cors');

const corsOptions = {
  origin: '*', // Allow all origins. Modify as needed for production.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);
