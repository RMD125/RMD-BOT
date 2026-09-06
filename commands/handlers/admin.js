module.exports = async (client, msg, args, context, cmd) => {
  await client.sendMessage(context.remoteJid, { 
    text: `🛡️ Commande admin: ${cmd.name}\n⚡ En développement...` 
  });
};
