const chalk = require('chalk');

const LOG_LEVELS = {
  info: chalk.blue('ℹ️ INFO'),
  warn: chalk.yellow('⚠️ WARN'),
  error: chalk.red('❌ ERROR'),
  success: chalk.green('✅ SUCCESS'),
  debug: chalk.gray('🐛 DEBUG')
};

function log(level, message, ...args) {
  const timestamp = new Date().toLocaleString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  console.log(`[${timestamp}] ${LOG_LEVELS[level] || level} ${message}`, ...args);
}

module.exports = {
  info: (msg, ...args) => log('info', msg, ...args),
  warn: (msg, ...args) => log('warn', msg, ...args),
  error: (msg, ...args) => log('error', msg, ...args),
  success: (msg, ...args) => log('success', msg, ...args),
  debug: (msg, ...args) => log('debug', msg, ...args)
};
