module.exports = async (client, msg, args, context, cmd) => {
  await client.sendMessage(context.remoteJid, { 
    text: `📖 Commande dictionnaire: ${cmd.name}\n📚 En développement...` 
  });
};
