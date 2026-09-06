const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

class Database {
  constructor() {
    this.path = config.databasePath;
    this.data = this.load();
  }

  load() {
    if (fs.existsSync(this.path)) {
      try {
        return JSON.parse(fs.readFileSync(this.path, 'utf8'));
      } catch (e) {
        console.error('Erreur chargement DB, création nouvelle', e);
        return this.getDefault();
      }
    }
    return this.getDefault();
  }

  getDefault() {
    return {
      warns: {},
      settings: {},
      welcomeMessages: {},
      goodbyeMessages: {},
      antilink: {},
      antispam: {},
      muted: {},
      banned: {},
      autoreply: {},
      autoreact: {},
      autoview: {},
      afk: {},
      schedules: [],
      notes: {},
      cmdReactions: {},
      userRanks: {},
      married: {},
      inventory: {},
      economy: {},
      botSettings: {
        maintenance: false,
        mode: 'public',
        language: 'fr'
      }
    };
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  // Warns
  addWarn(userId) {
    if (!this.data.warns[userId]) this.data.warns[userId] = 0;
    this.data.warns[userId]++;
    this.save();
    return this.data.warns[userId];
  }

  getWarns(userId) {
    return this.data.warns[userId] || 0;
  }

  resetWarns(userId) {
    this.data.warns[userId] = 0;
    this.save();
  }

  // Settings
  getSetting(chatId, key, defaultValue = false) {
    if (!this.data.settings[chatId]) this.data.settings[chatId] = {};
    if (this.data.settings[chatId][key] === undefined) return defaultValue;
    return this.data.settings[chatId][key];
  }

  setSetting(chatId, key, value) {
    if (!this.data.settings[chatId]) this.data.settings[chatId] = {};
    this.data.settings[chatId][key] = value;
    this.save();
  }

  // Economy
  getCoins(userId) {
    if (!this.data.economy[userId]) this.data.economy[userId] = { coins: 0, bank: 0 };
    return this.data.economy[userId].coins || 0;
  }

  addCoins(userId, amount) {
    if (!this.data.economy[userId]) this.data.economy[userId] = { coins: 0, bank: 0 };
    this.data.economy[userId].coins += amount;
    this.save();
    return this.data.economy[userId].coins;
  }

  // AFK
  setAFK(userId, message) {
    this.data.afk[userId] = { message, time: Date.now() };
    this.save();
  }

  removeAFK(userId) {
    delete this.data.afk[userId];
    this.save();
  }

  isAFK(userId) {
    return this.data.afk[userId] || null;
  }
}

module.exports = new Database();
