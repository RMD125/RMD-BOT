const generatePairingCode = require('../../pair');
const os = require('os');

module.exports = async (client, msg, args, context, cmd) => {
  const { remoteJid, db, config } = context;

  switch (cmd.name) {
    case 'alive':
    case 'ping':
    case 'pong':
    case 'status':
      const start = Date.now();
      await client.sendMessage(remoteJid, { text: '🏓 Pong!' });
      const end = Date.now();
      await client.sendMessage(remoteJid, { text: `⏱️ Latence: ${end - start}ms` });
      break;

    case 'menu':
    case 'help':
    case 'commands':
    case 'h':
    case 'list':
      let menu = `╔══════〔 RMDBOT v3 〕══════╗\n`;
      menu += `║ 🤖 Bot : RMDBOT v3\n`;
      menu += `║ ⚡ Préfixes: ${config.prefixes.join(', ')}\n`;
      menu += `║ 📦 Commandes: ${context.commands.commandMap.size}\n`;
      menu += `║ 🕒 Uptime: ${process.uptime().toFixed(0)}s\n`;
      menu += `╚═══════════════════════════╝\n\n`;

      const categories = context.commands.categories;
      let count = 0;
      for (const [cat, cmds] of Object.entries(categories)) {
        if (count >= 5) break;
        menu += `╔══════〔 ${cat.toUpperCase()} 〕══════╗\n`;
        const display = cmds.slice(0, 10).map(c => `✦ .${c}`).join('\n');
        menu += display;
        if (cmds.length > 10) menu += `\n... et ${cmds.length - 10} autres`;
        menu += '\n╚═══════════════════════════╝\n\n';
        count++;
      }
      menu += `🔗 Canal: ${config.channel}`;
      await client.sendMessage(remoteJid, { text: menu });
      break;

    case 'pair':
    case 'paircode':
    case 'getpair':
      if (!args[0]) {
        return client.sendMessage(remoteJid, { text: '❌ Utilisation: .pair 228XXXXXXXXX' });
      }
      const number = args[0].replace(/[^0-9]/g, '');
      if (!number.startsWith('228') || number.length < 8) {
        return client.sendMessage(remoteJid, { text: '❌ Numéro invalide. Doit commencer par 228.' });
      }
      try {
        const code = await generatePairingCode(number);
        await client.sendMessage(remoteJid, { text: `✅ Code d'appairage pour ${number}: *${code}*` });
      } catch (err) {
        await client.sendMessage(remoteJid, { text: `❌ Erreur: ${err.message}` });
      }
      break;

    case 'uptime':
    case 'runtime':
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      await client.sendMessage(remoteJid, { text: `🕒 Uptime: ${days}j ${hours}h ${minutes}m ${seconds}s` });
      break;

    case 'sysinfo':
    case 'system':
    case 'serverstats':
    case 'serverinfo':
      const info = `📊 *Infos système*\n` +
        `🖥️ OS: ${os.type()} ${os.release()}\n` +
        `🧠 RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} Go total, ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} Go libre\n` +
        `⚙️ CPU: ${os.cpus().length} cœurs\n` +
        `📦 Node: ${process.version}`;
      await client.sendMessage(remoteJid, { text: info });
      break;

    case 'afk':
      const message = args.join(' ') || 'Je suis AFK';
      db.setAFK(context.senderNumber, message);
      await client.sendMessage(remoteJid, { text: `✅ Vous êtes maintenant AFK: "${message}"` });
      break;

    default:
      const generic = require('../generic');
      await generic(client, msg, args, context, cmd);
  }
};
