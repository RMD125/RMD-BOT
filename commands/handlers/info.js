module.exports = async (client, msg, args, context, cmd) => {
  await client.sendMessage(context.remoteJid, { 
    text: `ℹ️ Commande info: ${cmd.name}\n📊 En développement...` 
  });
};
