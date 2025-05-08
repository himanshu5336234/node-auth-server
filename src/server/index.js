const express = require('express');
const corsMiddleware = require('../middlewares/cors');
const Routes = require('../routes/index');

function startServer(port = 8000) {
  const app = express();

  // Middleware
  app.use(corsMiddleware);
  app.use(express.json());

  // Routes
  app.use('/api', Routes);

  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Error Handler
  app.use((err, req, res, next) => {
    console.error('Internal Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  });

  // Start Server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = { startServer };
