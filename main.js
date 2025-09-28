const makeWASocket = require('@whiskeysockets/baileys').default;
const { useSingleFileAuthState, delay } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
    owner: "221XXXXXXXXX@s.whatsapp.net",
    prefix: ".",
    botName: "RMD-BOT",
    ownerName: "RMD125"
};

// Système d'authentification
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

// Création du client WhatsApp
const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: undefined
});

// Gestion QR Code
sock.ev.on('connection.update', (update) => {
    const { connection, qr } = update;
    
    if (qr) {
        console.log('🔗 Scan ce QR Code avec WhatsApp:');
        qrcode.generate(qr, { small: true });
    }
    
    if (connection === 'open') {
        console.log('✅ Connecté à WhatsApp!');
        console.log(`🤖 ${config.botName} activé par ${config.ownerName}`);
    }
});

// Gestion des messages
sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    
    if (!msg.message || msg.key.fromMe) return;
    
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const jid = msg.key.remoteJid;
    const isGroup = jid.endsWith('@g.us');
    
    if (text.startsWith(config.prefix)) {
        const command = text.slice(config.prefix.length).trim().split(' ')[0].toLowerCase();
        const args = text.slice(config.prefix.length + command.length).trim().split(' ');
        
        await handleCommand(sock, msg, command, args, jid, isGroup);
    }
});

// Gestionnaire de commandes
async function handleCommand(sock, msg, command, args, jid, isGroup) {
    const commands = {
        // Commandes de base
        'ping': async () => {
            const start = Date.now();
            await sock.sendMessage(jid, { text: '🏓 Pong!' });
            const latency = Date.now() - start;
            await sock.sendMessage(jid, { text: `⚡ Latence: ${latency}ms` });
        },
        
        'menu': async () => {
            const menu = `
╔〘 *☠️RMD-BOT☠️* 〙
║ 👑 *Owner:* ${config.ownerName}
║ 🧩 *Prefix:* [ ${config.prefix} ]
║ 🧠 *Commands:* 75+

⎾═╼▣ *MENU PRINCIPAL*
︱✗ ${config.prefix}ping - Test vitesse
︱✗ ${config.prefix}menu - Ce menu
︱✗ ${config.prefix}owner - Contact
︱✗ ${config.prefix}info - Infos bot
⎿═╼▣

🚀 *Bot opérationnel!*
            `.trim();
            
            await sock.sendMessage(jid, { text: menu });
        },
        
        'owner': async () => {
            await sock.sendMessage(jid, { 
                text: `👑 *Propriétaire:* ${config.ownerName}\n📞 *Contact:* ${config.owner}` 
            });
        },
        
        'info': async () => {
            const info = `
🤖 *INFORMATIONS BOT*
• Nom: ${config.botName}
• Créateur: ${config.ownerName}
• Préfixe: ${config.prefix}
• Statut: 🟢 En ligne
• Groupe: ${isGroup ? '🟢 Oui' : '🔴 Non'}
            `.trim();
            
            await sock.sendMessage(jid, { text: info });
        }
    };
    
    if (commands[command]) {
        await commands[command]();
    } else {
        await sock.sendMessage(jid, { 
            text: `❌ Commande *${command}* non trouvée.\nTapez *${config.prefix}menu* pour la liste.` 
        });
    }
}

// Sauvegarde de l'état
sock.ev.on('creds.update', saveState);

console.log(`
╔〘 *☠️RMD-BOT☠️* 〙
║ 👑 *Owner:* ${config.ownerName}
║ 🧩 *Prefix:* [ ${config.prefix} ]
║ 🧠 *Bot Name:* ${config.botName}
║ ⚙️ *Mode:* Public
║ 🚀 *Démarrage...*
╚═〘 *RMD125 SYSTEM* 〙
`);
