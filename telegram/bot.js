const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const generatePairingCode = require('../pair');
const logger = require('../utils/logger');

let bot = null;

function startTelegramBot() {
  bot = new TelegramBot(config.telegram.token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 
      `👋 *Bienvenue sur RMDBOT v3!*\n\n` +
      `🤖 Bot avec 1500+ commandes\n` +
      `📱 WhatsApp + Web + Telegram\n\n` +
      `📌 *Commandes disponibles:*\n` +
      `/pair 228XXXXXXXX - Génère un code d'appairage\n` +
      `/start - Message d'accueil\n` +
      `/help - Cette aide\n\n` +
      `🔗 Canal: ${config.channel}`,
      { parse_mode: 'Markdown' }
    );
  });

  bot.onText(/\/pair (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const number = match[1].replace(/[^0-9]/g, '');
    
    if (!number.startsWith('228') || number.length < 8) {
      return bot.sendMessage(chatId, '❌ Numéro invalide. Utilisez /pair 228XXXXXXXX');
    }
    
    try {
      const code = await generatePairingCode(number);
      bot.sendMessage(chatId, 
        `✅ *Code d'appairage généré!*\n\n` +
        `📱 Numéro: ${number}\n` +
        `🔑 Code: *${code}*\n\n` +
        `🔄 Utilisez ce code dans WhatsApp pour connecter le bot.`,
        { parse_mode: 'Markdown' }
      );
    } catch (err) {
      bot.sendMessage(chatId, `❌ Erreur: ${err.message}`);
    }
  });

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, 
      `📚 *Aide RMDBOT v3*\n\n` +
      `🔹 /pair <numéro> - Génère un code d'appairage\n` +
      `🔹 /start - Message d'accueil\n` +
      `🔹 /help - Cette aide\n\n` +
      `🌐 Site web: ${config.web.url}\n` +
      `📱 Canal: ${config.channel}`,
      { parse_mode: 'Markdown' }
    );
  });

  logger.info('📱 Bot Telegram démarré');
}

function stopTelegramBot() {
  if (bot) {
    bot.stopPolling();
    bot = null;
  }
}

module.exports = { startTelegramBot, stopTelegramBot };
