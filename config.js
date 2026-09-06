const path = require('path');

module.exports = {
  // Numéros des administrateurs (sans indicatif, sans +)
  admins: ['22896190934', '22896124078', '22892142680'],
  botNumber: '22896124078',
  prefixes: ['.', '!', '/', '#'],

  web: {
    port: process.env.PORT || 3000,
    url: 'https://whatsapp-bot-interfa-winz.bolt.host'
  },

  telegram: {
    token: '8483184996:AAFuCX5qnSKfWMsTWq1c_YJzqbTVSKV2SpE'
  },

  channel: 'https://whatsapp.com/channel/0029VbDJgsCE50UbzHp6jx1w',

  databasePath: path.join(__dirname, 'database.json'),
  sessionFolder: path.join(__dirname, 'sessions'),
  tmpFolder: path.join(__dirname, 'tmp'),

  // APIs (à remplacer par vos clés)
  apiKeys: {
    openai: 'votre-clé-openai',
    google: 'votre-clé-google',
    weather: 'votre-clé-meteo',
    rapidapi: 'votre-clé-rapidapi'
  }
};
