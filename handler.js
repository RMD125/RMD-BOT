const config = require('./config');
const db = require('./database');
const commands = require('./commands');
const logger = require('./utils/logger');
const { isAdmin, isGroup, extractCommand } = require('./utils/helpers');

let client = null;

function setClient(sock) {
  client = sock;
}

async function handleMessage(msg) {
  if (!msg.message || !msg.key) return;

  const remoteJid = msg.key.remoteJid;
  const fromMe = msg.key.fromMe;
  const sender = msg.key.participant || remoteJid;
  const isGroupChat = remoteJid.endsWith('@g.us');

  if (fromMe) return;

  let text = '';
  if (msg.message?.conversation) text = msg.message.conversation;
  else if (msg.message?.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text;
  else if (msg.message?.imageMessage?.caption) text = msg.message.imageMessage.caption;
  else if (msg.message?.videoMessage?.caption) text = msg.message.videoMessage.caption;
  else return;

  const prefix = config.prefixes.find(p => text.startsWith(p));
  if (!prefix) return;

  const fullCmd = text.slice(prefix.length).trim();
  const parts = fullCmd.split(/\s+/);
  const cmdName = parts[0].toLowerCase();
  const args = parts.slice(1);

  const cmd = commands.get(cmdName);
  if (!cmd) return;

  const senderNumber = sender.split('@')[0];
  const isAdminBot = config.admins.includes(senderNumber);
  const isGroupAdmin = isGroupChat ? await isGroupAdminUser(remoteJid, sender) : false;

  // Vérification des permissions
  if (cmd.ownerOnly && !isAdminBot) {
    await client.sendMessage(remoteJid, { text: '❌ Commande réservée aux administrateurs du bot.' });
    return;
  }

  if (cmd.adminOnly && !isAdminBot && !isGroupAdmin) {
    await client.sendMessage(remoteJid, { text: '❌ Vous devez être admin du groupe ou du bot.' });
    return;
  }

  // Vérification maintenance
  const maintenance = db.get('botSettings').maintenance;
  if (maintenance && !isAdminBot) {
    await client.sendMessage(remoteJid, { text: '⚠️ Le bot est en maintenance. Réessayez plus tard.' });
    return;
  }

  // Vérification AFK
  if (isGroupChat) {
    const afkData = db.isAFK(senderNumber);
    if (afkData) {
      await client.sendMessage(remoteJid, { 
        text: `🚶 ${sender.split('@')[0]} est AFK: ${afkData.message}` 
      });
      db.removeAFK(senderNumber);
    }
  }

  try {
    await cmd.execute(client, msg, args, { 
      isGroup: isGroupChat, 
      sender, 
      senderNumber, 
      remoteJid, 
      db, 
      config, 
      isAdminBot, 
      isGroupAdmin,
      commands
    });
  } catch (err) {
    logger.error(`Erreur commande ${cmdName}:`, err);
    await client.sendMessage(remoteJid, { text: `⚠️ Erreur: ${err.message}` });
  }
}

async function isGroupAdminUser(groupJid, participantJid) {
  try {
    const groupMetadata = await client.groupMetadata(groupJid);
    const admin = groupMetadata.participants.find(p => p.id === participantJid && p.admin);
    return !!admin;
  } catch {
    return false;
  }
}

module.exports = { handleMessage, setClient };
