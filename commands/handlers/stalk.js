module.exports = async (client, msg, args, context, cmd) => {
  await client.sendMessage(context.remoteJid, { 
    text: `🔎 Commande stalk: ${cmd.name}\n👤 En développement...` 
  });
};
