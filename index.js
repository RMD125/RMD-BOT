const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('boom');
const Pino = require('pino');
const config = require('./config');
const db = require('./database');
const { handleMessage, setClient } = require('./handler');
const { startServer, setClientStatus } = require('./web/server');
const { startTelegramBot } = require('./telegram/bot');
const logger = require('./utils/logger');
const fs = require('fs-extra');

fs.ensureDirSync(config.sessionFolder);
fs.ensureDirSync(config.tmpFolder);

let clientInstance = null;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionFolder);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, {})
    },
    printQRInTerminal: true,
    logger: Pino({ level: 'silent' }),
    browser: ['RMDBOT v3', 'Chrome', '1.0.0']
  });

  clientInstance = sock;
  setClient(sock);
  global.waClient = sock;

  const updateStatus = (connected) => {
    setClientStatus(connected, connected ? sock : null);
  };

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      logger.info('QR Code reçu, scannez avec WhatsApp');
    }
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      updateStatus(false);
      if (shouldReconnect) {
        logger.info('Reconnexion en cours...');
        setTimeout(startBot, 2000);
      } else {
        logger.error('Déconnecté définitivement (logout)');
        process.exit(1);
      }
    } else if (connection === 'open') {
      logger.info('WhatsApp connecté !');
      updateStatus(true);
      for (const admin of config.admins) {
        try {
          await sock.sendMessage(admin + '@s.whatsapp.net', { 
            text: '🤖 RMDBOT v3 est en ligne avec 1500+ commandes !' 
          });
        } catch {}
      }
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type === 'notify') {
      for (const msg of messages) {
        await handleMessage(msg);
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);

  startServer();
  startTelegramBot();

  logger.success('🚀 RMDBOT v3 prêt !');
}

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
});

startBot();
