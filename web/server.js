const express = require('express');
const cors = require('cors');
const path = require('path');
const generatePairingCode = require('../pair');
const config = require('../config');
const logger = require('../utils/logger');

let clientStatus = false;
let clientInstance = null;

function setClientStatus(status, client) {
  clientStatus = status;
  clientInstance = client;
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status', (req, res) => {
  res.json({
    status: clientStatus ? 'connected' : 'disconnected',
    botNumber: config.botNumber,
    version: '1.0.0',
    commands: 1500
  });
});

app.post('/api/pair', async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: 'Numéro requis' });
  }
  try {
    const code = await generatePairingCode(number);
    res.json({ success: true, code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function startServer() {
  const port = config.web.port || 3000;
  app.listen(port, () => {
    logger.info(`🌐 Serveur web démarré sur le port ${port}`);
  });
}

module.exports = { startServer, setClientStatus };
