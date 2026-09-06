const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const { Boom } = require('boom');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');

async function generatePairingCode(phoneNumber) {
  const number = phoneNumber.replace(/[^0-9]/g, '');
  if (!number.startsWith('228') || number.length < 8) {
    throw new Error('Numéro invalide. Doit commencer par 228.');
  }

  const tempSession = path.join(config.sessionFolder, `pair_${Date.now()}`);
  fs.ensureDirSync(tempSession);

  try {
    const { state, saveCreds } = await useMultiFileAuthState(tempSession);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, {})
      },
      printQRInTerminal: false,
      browser: ['RMDBOT Pairing', 'Chrome', '1.0.0']
    });

    const code = await sock.requestPairingCode(number);
    fs.removeSync(tempSession);
    return code;
  } catch (error) {
    fs.removeSync(tempSession).catch(() => {});
    throw new Error(`Impossible de générer le code: ${error.message}`);
  }
}

module.exports = generatePairingCode;
