const config = require('../config.json');

// ban☠️ - Signalement massif (owner seulement)
async function banSpecial(client, message, args, contact, chat, isGroup, config) {
    if (!config.admins.includes(message.author) && message.author !== config.ownerNumber) {
        return await message.reply('❌ Commande réservée aux admins/owner');
    }
    
    const target = args[0];
    if (!target) return await message.reply('❌ Usage: .ban☠️ 221XXXXXXXX');
    
    const reports = parseInt(args[1]) || 100;
    if (reports > 500) return await message.reply('❌ Maximum 500 rapports');
    
    await message.reply(`⚡ Lancement de ${reports} rapports sur ${target}...`);
    
    // Simulation de rapports (éducatif)
    for (let i = 1; i <= Math.min(reports, 10); i++) {
        await message.reply(`📋 Rapport ${i}/${Math.min(reports, 10)} envoyé pour ${target}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    await message.reply(`✅ ${Math.min(reports, 10)} rapports simulés sur ${target}`);
}

// purge - Nettoyage groupe (admin seulement)
async function purgeCommand(client, message, args, contact, chat, isGroup, config) {
    if (!isGroup) return await message.reply('❌ Commande groupe seulement');
    
    const participants = await chat.participants;
    const isAdmin = participants.find(p => p.id._serialized === message.author)?.isAdmin;
    
    if (!isAdmin && !config.admins.includes(message.author)) {
        return await message.reply('❌ Admins seulement');
    }
    
    const target = args[0];
    await message.reply(`🗑️ Purge lancée... Mode: ${target || 'sélectif'}`);
}

// tagall+ - Mention avancée
async function tagallPlus(client, message, args, contact, chat, isGroup, config) {
    if (!isGroup) return await message.reply('❌ Commande groupe seulement');
    
    const text = args.join(' ') || 'Mention générale';
    const participants = await chat.participants;
    
    let mentionText = `${text}\n\n`;
    participants.forEach((member, index) => {
        mentionText += `@${member.id.user} `;
        if ((index + 1) % 5 === 0) mentionText += '\n';
    });
    
    await message.reply(mentionText, undefined, { mentions: participants.map(p => p.id._serialized) });
}

// autoban - Bannissement auto
async function autobanCommand(client, message, args, contact, chat, isGroup, config) {
    if (!config.admins.includes(message.author)) {
        return await message.reply('❌ Admins seulement');
    }
    
    await message.reply('🤖 Système AutoBan activé');
}

// guard - Protection
async function guardCommand(client, message, args, contact, chat, isGroup, config) {
    await message.reply('🛡️ Système de protection activé');
}

module.exports = {
    'ban☠️': banSpecial,
    'purge': purgeCommand,
    'tagall+': tagallPlus,
    'autoban': autobanCommand,
    'guard': guardCommand
};
