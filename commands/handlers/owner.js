module.exports = async (client, msg, args, context, cmd) => {
  await client.sendMessage(context.remoteJid, { 
    text: `👑 Commande owner: ${cmd.name}\n🔒 Réservée aux admins` 
  });
};
