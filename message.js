const commandHandler = require('./command');
const config = require('../config.json');

async function handleMessage(client, message, config, startTime) {
    try {
        if (message.from === 'status@broadcast') return;
        
        const contact = await message.getContact();
        const chat = await message.getChat();
        const isGroup = chat.isGroup;
        const body = message.body || '';
        
        // Vérifier le préfixe
        if (body.startsWith(config.prefix)) {
            const args = body.slice(config.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            await commandHandler(client, message, command, args, contact, chat, isGroup, config, startTime);
        }
        
    } catch (error) {
        console.error('Erreur message:', error);
    }
}

module.exports = handleMessage;
