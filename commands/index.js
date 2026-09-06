const COMMANDS = require('./registry');
const fs = require('fs');
const path = require('path');

const handlers = {};
const handlerFiles = fs.readdirSync(path.join(__dirname, 'handlers')).filter(f => f.endsWith('.js'));

for (const file of handlerFiles) {
  const handlerName = path.basename(file, '.js');
  handlers[handlerName] = require(`./handlers/${file}`);
}

const genericHandler = require('./generic');

const commandMap = new Map();
const categories = {};

COMMANDS.forEach(cmd => {
  if (!commandMap.has(cmd.name)) {
    commandMap.set(cmd.name, {
      ...cmd,
      execute: async (client, msg, args, context) => {
        const handler = handlers[cmd.handler] || genericHandler;
        await handler(client, msg, args, context, cmd);
      }
    });
  }
  
  if (cmd.alias && Array.isArray(cmd.alias)) {
    cmd.alias.forEach(alias => {
      if (!commandMap.has(alias)) {
        commandMap.set(alias, {
          ...cmd,
          name: alias,
          execute: async (client, msg, args, context) => {
            const handler = handlers[cmd.handler] || genericHandler;
            await handler(client, msg, args, context, cmd);
          }
        });
      }
    });
  }
  
  if (cmd.category) {
    if (!categories[cmd.category]) categories[cmd.category] = [];
    categories[cmd.category].push(cmd.name);
  }
});

module.exports = {
  get: (cmdName) => commandMap.get(cmdName),
  getAll: () => Array.from(commandMap.values()),
  categories,
  commandMap
};
