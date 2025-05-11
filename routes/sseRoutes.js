// routes/sseRoutes.js
const express = require('express');
const router = express.Router();

// In-memory list of connected clients
const clients = [];

// GET /realtime (SSE)
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: {"type": "init", "timestamp": ' + Date.now() + 
'}\n\n');
  
  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  req.on('close', () => {
    const index = clients.findIndex(client => client.id === clientId);
    clients.splice(index, 1);
  });
});

function broadcastProduct(product) {
  const data = JSON.stringify({ type: 'new_product', product });
  clients.forEach(client => {
    client.res.write(`data: ${data}\n\n`);
  });
}

module.exports = { router, broadcastProduct };
