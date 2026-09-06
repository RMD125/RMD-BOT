function isAdmin(admins, number) {
  return admins.includes(number);
}

function isGroup(jid) {
  return jid.endsWith('@g.us');
}

function extractCommand(text, prefixes) {
  const prefix = prefixes.find(p => text.startsWith(p));
  if (!prefix) return null;
  const parts = text.slice(prefix.length).trim().split(/\s+/);
  return {
    name: parts[0].toLowerCase(),
    args: parts.slice(1)
  };
}

function formatNumber(number) {
  return number.replace(/[^0-9]/g, '');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncate(str, length = 100) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

module.exports = {
  isAdmin,
  isGroup,
  extractCommand,
  formatNumber,
  sleep,
  randomInt,
  capitalize,
  truncate
};
