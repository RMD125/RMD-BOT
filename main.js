const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./config.json');
const messageHandler = require('./handlers/message');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.session'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let botStartTime = Date.now();

console.log(`
╔〘 *☠️RMD-BOT☠️* 〙
║ 👑 *Owner:* ${config.ownerName}
║ 🧩 *Prefix:* [ ${config.prefix} ]
║ 🧠 *Bot Name:* ${config.botName}
║ ⚙️ *Mode:* Public
║ 🚀 *Initialisation...*
╚═〘 *RMD125 SYSTEM* 〙
`);

client.on('qr', (qr) => {
    console.log('[SYSTEM] Scan du QR Code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('[SYSTEM] Bot prêt!');
    console.log(`[SYSTEM] Connecté en tant que: ${client.info.pushname}`);
    console.log(`[SYSTEM] ${config.botName} activé avec succès!`);
});

client.on('message', async (message) => {
    await messageHandler(client, message, config, botStartTime);
});

client.on('disconnected', (reason) => {
    console.log('[SYSTEM] Bot déconnecté:', reason);
});

client.initialize();

module.exports = { client };
