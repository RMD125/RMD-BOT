// Toutes les commandes avec leurs métadonnées
const COMMANDS = [];

// ============================================================
// GENERAL
// ============================================================
const general = [
  { name: 'alive', alias: ['ping', 'pong', 'status'], category: 'General', description: 'Vérifie si le bot est en ligne', handler: 'general' },
  { name: 'menu', alias: ['help', 'commands', 'h', 'list'], category: 'General', description: 'Affiche le menu des commandes', handler: 'general' },
  { name: 'pair', alias: ['paircode', 'getpair'], category: 'General', description: 'Génère un code d\'appairage', handler: 'general' },
  { name: 'uptime', alias: ['runtime'], category: 'General', description: 'Temps de fonctionnement', handler: 'general' },
  { name: 'sysinfo', alias: ['system', 'serverstats', 'serverinfo'], category: 'General', description: 'Infos système', handler: 'general' },
  { name: 'pingweb', alias: ['pweb'], category: 'General', description: 'Ping le serveur web', handler: 'general' },
  { name: 'find', alias: ['lookup', 'searchcmd'], category: 'General', description: 'Cherche une commande', handler: 'general' },
  { name: 'smenu', alias: ['shelp', 'smart'], category: 'General', description: 'Menu intelligent', handler: 'general' },
  { name: 'help2', alias: ['h2'], category: 'General', description: 'Aide alternative', handler: 'general' },
  { name: 'perf', alias: ['metrics', 'diagnostics'], category: 'General', description: 'Performances', handler: 'general' },
  { name: 'viewonce', alias: ['viewmedia', 'vv'], category: 'General', description: 'Voir un message éphémère', handler: 'general' },
  { name: 'echo', alias: [], category: 'General', description: 'Répète votre message', handler: 'general' },
  { name: 'getpp', alias: ['dlpp', 'profilepic', 'getdp'], category: 'General', description: 'Télécharge la photo de profil', handler: 'general' },
  { name: 'session', alias: ['getsession', 'sessionid'], category: 'General', description: 'Affiche l\'ID de session', handler: 'general' },
  { name: 'channelid', alias: ['newsletterid'], category: 'General', description: 'ID du canal WhatsApp', handler: 'general' },
  { name: 'afk', alias: [], category: 'General', description: 'Mode AFK', handler: 'general' },
  { name: '🙂', alias: [], category: 'General', description: 'Emoji sourire', handler: 'general' }
];

// ============================================================
// GROUP
// ============================================================
const group = [
  { name: 'accept', alias: ['approve'], category: 'Group', description: 'Accepter une demande de groupe', handler: 'group' },
  { name: 'acceptall', alias: ['approveall'], category: 'Group', description: 'Accepter toutes les demandes', handler: 'group' },
  { name: 'reject', alias: ['deny'], category: 'Group', description: 'Refuser une demande', handler: 'group' },
  { name: 'rejectall', alias: ['denyall'], category: 'Group', description: 'Refuser toutes les demandes', handler: 'group' },
  { name: 'pending', alias: ['requestlist'], category: 'Group', description: 'Liste des demandes en attente', handler: 'group' },
  { name: 'antimedia', alias: ['am'], category: 'Group', description: 'Bloquer les médias', handler: 'group' },
  { name: 'antimention', alias: ['ammention'], category: 'Group', description: 'Bloquer les mentions', handler: 'group' },
  { name: 'character', alias: ['personality', 'traits'], category: 'Group', description: 'Attribue un caractère', handler: 'group' },
  { name: 'compliment', alias: ['praise', 'nice'], category: 'Group', description: 'Fait un compliment', handler: 'group' },
  { name: 'gcmtdata', alias: ['gcinfo', 'groupinfo', 'gcmetadata', 'groupdata', 'ginfo', 'infogroup'], category: 'Group', description: 'Infos du groupe', handler: 'group' },
  { name: 'groupking', alias: ['groupqueen', 'groupghost', 'groupactive', 'grouprich', 'grouppoor', 'groupmafia', 'grouppolice', 'groupdoctor', 'groupteacher', 'groupgenius', 'groupclown', 'groupsus', 'grouplegend', 'grouphero', 'groupvillain', 'grouppresident', 'groupminister', 'groupboss', 'groupbaby', 'groupelder', 'groupdetective', 'groupwizard', 'groupninja', 'grouprocker', 'groupgamer', 'groupluckiest', 'groupunluckiest', 'groupromantic', 'groupdanger', 'groupfamous', 'groupmillionaire', 'groupbodyguard', 'groupjudge', 'groupprankster', 'groupchampion', 'groupalien', 'groupvampire', 'groupzombie', 'groupcouple', 'groupfamily', 'groupship', 'groupbattle', 'groupvote', 'groupcrush', 'groupmarriage', 'groupjail', 'grouptreasure', 'grouplottery', 'grouprevenge', 'groupmeme', 'groupgod'], category: 'Group', description: 'Attribue un rôle dans le groupe', handler: 'group' },
  { name: 'insult', alias: ['roast', 'mock'], category: 'Group', description: 'Insulte un membre', handler: 'group' },
  { name: 'invitelink', alias: ['invite', 'grouplink', 'gclink'], category: 'Group', description: 'Obtenir le lien d\'invitation', handler: 'group' },
  { name: 'revokeinvite', alias: ['resetlink'], category: 'Group', description: 'Révoquer le lien d\'invitation', handler: 'group' },
  { name: 'joinrequests', alias: ['gcreqs', 'groupreqs', 'pendingjoins'], category: 'Group', description: 'Voir les demandes d\'adhésion', handler: 'group' },
  { name: 'approvejoin', alias: ['acceptjoin'], category: 'Group', description: 'Approuver une demande', handler: 'group' },
  { name: 'rejectjoin', alias: ['denyjoin'], category: 'Group', description: 'Refuser une demande', handler: 'group' },
  { name: 'kickall', alias: [], category: 'Group', description: 'Expulser tous les membres (danger)', handler: 'group' },
  { name: 'poll', alias: ['createpoll', 'newpoll'], category: 'Group', description: 'Créer un sondage', handler: 'group' },
  { name: 'rank', alias: ['top', 'topusers', 'leaderboard', 'ranks'], category: 'Group', description: 'Classement des membres', handler: 'group' },
  { name: 'ship', alias: ['couple'], category: 'Group', description: 'Mettre en couple deux membres', handler: 'group' },
  { name: 'simp', alias: ['simpcard'], category: 'Group', description: 'Carte de simping', handler: 'group' },
  { name: 'staff', alias: ['admins', 'adminlist'], category: 'Group', description: 'Liste des admins', handler: 'group' },
  { name: 'stupid', alias: ['stupidcard', 'dumb'], category: 'Group', description: 'Carte de stupidité', handler: 'group' },
  { name: 'warnings', alias: ['checkwarn', 'warncount'], category: 'Group', description: 'Affiche les avertissements', handler: 'group' },
  { name: 'wasted', alias: ['waste'], category: 'Group', description: 'Effet "wasted"', handler: 'group' },
  { name: 'welcome2', alias: [], category: 'Group', description: 'Message de bienvenue version 2', handler: 'group' }
];

// ============================================================
// OWNER
// ============================================================
const owner = [
  { name: 'addreply', alias: ['newtrigger', 'setreply'], category: 'Owner', description: 'Ajouter une réponse automatique', handler: 'owner' },
  { name: 'anticall', alias: ['acall', 'callblock'], category: 'Owner', description: 'Bloquer les appels', handler: 'owner' },
  { name: 'antidelete', alias: ['antidel', 'adel'], category: 'Owner', description: 'Anti-suppression de messages', handler: 'owner' },
  { name: 'archivechat', alias: ['archive', 'unarchive', 'unarchivechat'], category: 'Owner', description: 'Archiver/désarchiver un chat', handler: 'owner' },
  { name: 'autoreact', alias: ['areact'], category: 'Owner', description: 'Réagir automatiquement aux messages', handler: 'owner' },
  { name: 'autoread', alias: ['read', 'autoreadmsg'], category: 'Owner', description: 'Lecture automatique des messages', handler: 'owner' },
  { name: 'autoreply', alias: ['ar', 'autorespond'], category: 'Owner', description: 'Répondre automatiquement', handler: 'owner' },
  { name: 'autostatus', alias: ['autoview', 'statusview'], category: 'Owner', description: 'Voir automatiquement les statuts', handler: 'owner' },
  { name: 'autotyping', alias: ['typing', 'autotype'], category: 'Owner', description: 'Simulation de frappe', handler: 'owner' },
  { name: 'block', alias: ['blk'], category: 'Owner', description: 'Bloquer un utilisateur', handler: 'owner' },
  { name: 'broadcast', alias: ['bc', 'announce'], category: 'Owner', description: 'Diffuser un message à tous les chats', handler: 'owner' },
  { name: 'broadcastdm', alias: ['bcdm', 'announcedm', 'dmall'], category: 'Owner', description: 'Diffuser en DM', handler: 'owner' },
  { name: 'clear', alias: ['clr', 'clean', 'clearchat', 'deletechat'], category: 'Owner', description: 'Effacer un chat', handler: 'owner' },
  { name: 'clearsession', alias: ['clearses', 'csession'], category: 'Owner', description: 'Effacer la session', handler: 'owner' },
  { name: 'cleartmp', alias: ['cleartemp', 'tmpclear'], category: 'Owner', description: 'Effacer les fichiers temporaires', handler: 'owner' },
  { name: 'cmdreact', alias: ['creact', 'commandreact'], category: 'Owner', description: 'Réagir aux commandes', handler: 'owner' },
  { name: 'delcmd', alias: ['removecmd'], category: 'Owner', description: 'Supprimer une commande personnalisée', handler: 'owner' },
  { name: 'deletesession', alias: ['deletess', 'delss'], category: 'Owner', description: 'Supprimer la session', handler: 'owner' },
  { name: 'delplugin', alias: ['deleteplugin', 'rmplugin'], category: 'Owner', description: 'Supprimer un plugin', handler: 'owner' },
  { name: 'delreply', alias: ['removereply', 'rmreply'], category: 'Owner', description: 'Supprimer une réponse automatique', handler: 'owner' },
  { name: 'gcleave', alias: ['leavegroup', 'groupleave', 'leavegc'], category: 'Owner', description: 'Quitter un groupe', handler: 'owner' },
  { name: 'getfile', alias: ['readfile', 'viewfile'], category: 'Owner', description: 'Lire un fichier', handler: 'owner' },
  { name: 'inspect', alias: ['cat', 'readcode'], category: 'Owner', description: 'Inspecter un fichier', handler: 'owner' },
  { name: 'getplugin', alias: [], category: 'Owner', description: 'Obtenir un plugin', handler: 'owner' },
  { name: 'gitinfo', alias: ['infogit'], category: 'Owner', description: 'Infos Git', handler: 'owner' },
  { name: 'hack', alias: ['fakehack', 'prankhack'], category: 'Owner', description: 'Faux hack', handler: 'owner' },
  { name: 'addplugin', alias: ['installplugin', 'install'], category: 'Owner', description: 'Installer un plugin', handler: 'owner' },
  { name: 'joingroup', alias: ['join', 'gcjoin'], category: 'Owner', description: 'Rejoindre un groupe via lien', handler: 'owner' },
  { name: 'listcmd', alias: ['cmdlist', 'listrent', 'listclone', 'botclones'], category: 'Owner', description: 'Lister les commandes', handler: 'owner' },
  { name: 'listreplies', alias: ['autoreplies', 'replylist', 'replies'], category: 'Owner', description: 'Lister les réponses automatiques', handler: 'owner' },
  { name: 'maintenance', alias: ['mtnc', 'lockdown'], category: 'Owner', description: 'Mode maintenance', handler: 'owner' },
  { name: 'manage', alias: ['ctrl', 'control'], category: 'Owner', description: 'Gérer le bot', handler: 'owner' },
  { name: 'mention', alias: ['setmention', 'mentionreply'], category: 'Owner', description: 'Configurer les mentions', handler: 'owner' },
  { name: 'mode', alias: ['botmode', 'setmode'], category: 'Owner', description: 'Changer le mode du bot', handler: 'owner' },
  { name: 'pinchat', alias: ['pin', 'unpin', 'unpinchat'], category: 'Owner', description: 'Épingler un chat', handler: 'owner' },
  { name: 'pmblocker', alias: ['pmblock', 'blockpm', 'antipm'], category: 'Owner', description: 'Bloquer les MP', handler: 'owner' },
  { name: 'gitpull', alias: ['refresh', 'pull', 'reload', 'reloadplugins'], category: 'Owner', description: 'Recharger le bot', handler: 'owner' },
  { name: 'rentbot', alias: ['botclone', 'clonebot'], category: 'Owner', description: 'Louer le bot', handler: 'owner' },
  { name: 'setbio', alias: ['autobio', 'bio'], category: 'Owner', description: 'Changer la bio', handler: 'owner' },
  { name: 'setcmd', alias: ['addcmd'], category: 'Owner', description: 'Ajouter une commande personnalisée', handler: 'owner' },
  { name: 'setpp', alias: ['setppic', 'setdp'], category: 'Owner', description: 'Changer la photo de profil', handler: 'owner' },
  { name: 'settings', alias: ['config', 'setting'], category: 'Owner', description: 'Paramètres du bot', handler: 'owner' },
  { name: 'star', alias: ['starmsg', 'unstar', 'unstarmsg'], category: 'Owner', description: 'Épingler un message', handler: 'owner' },
  { name: 'statut', alias: [], category: 'Owner', description: 'Statut du bot', handler: 'owner' },
  { name: 'stealth', alias: ['alwaysonline', 'stealthmode'], category: 'Owner', description: 'Mode furtif', handler: 'owner' },
  { name: 'stoprent', alias: ['stopclone', 'delrent'], category: 'Owner', description: 'Arrêter la location', handler: 'owner' },
  { name: 'sudo', alias: [], category: 'Owner', description: 'Exécuter une commande système', handler: 'owner' },
  { name: 'unblock', alias: ['unblk'], category: 'Owner', description: 'Débloquer un utilisateur', handler: 'owner' }
];

// ============================================================
// DICTIONARY
// ============================================================
const dictionary = [
  { name: 'adjectif', alias: ['adj', 'adjdef'], category: 'Dictionary', description: 'Définition d\'un adjectif', handler: 'dictionary' },
  { name: 'adverb', alias: ['adv', 'advdef'], category: 'Dictionary', description: 'Définition d\'un adverbe', handler: 'dictionary' },
  { name: 'noun', alias: ['noundef', 'nouninfo'], category: 'Dictionary', description: 'Définition d\'un nom', handler: 'dictionary' },
  { name: 'phonetic', alias: ['phonetics', 'pronunciationtext', 'pronounce'], category: 'Dictionary', description: 'Prononciation phonétique', handler: 'dictionary' },
  { name: 'audio', alias: ['speak'], category: 'Dictionary', description: 'Audio de prononciation', handler: 'dictionary' },
  { name: 'synonym', alias: ['synonyms', 'syn'], category: 'Dictionary', description: 'Synonymes d\'un mot', handler: 'dictionary' }
];

// ============================================================
// AI
// ============================================================
const ai = [
  { name: 'gpt', alias: ['ai', 'chat', 'ask'], category: 'AI', description: 'Chat avec GPT', handler: 'ai' },
  { name: 'mistral', alias: ['llama'], category: 'AI', description: 'Chat avec Mistral/Llama', handler: 'ai' },
  { name: 'dalle', alias: ['aiimage', 'draw', 'genimage'], category: 'AI', description: 'Génère une image avec DALL-E', handler: 'ai' },
  { name: 'flux', alias: ['imagen', 'diffusion'], category: 'AI', description: 'Génère une image avec Flux', handler: 'ai' },
  { name: 'motivate', alias: ['inspire', 'motivation'], category: 'AI', description: 'Citation motivante', handler: 'ai' },
  { name: 'sora', alias: ['txt2video', 'aivideo'], category: 'AI', description: 'Génère une vidéo avec Sora', handler: 'ai' }
];

// ============================================================
// GAMES - Partie 1 (simplifiée pour la taille)
// ============================================================
const gamesPart1 = [
  { name: 'aikont', alias: ['aigame'], category: 'Games', description: 'Jeu de l\'IA', handler: 'games' },
  { name: 'coinf', alias: ['flip', 'coin', 'toss', 'heads', 'tails'], category: 'Games', description: 'Pile ou face', handler: 'games' },
  { name: 'dice', alias: ['roll', 'roll2', 'roll6'], category: 'Games', description: 'Lancer de dé', handler: 'games' },
  { name: 'rps', alias: ['rock', 'paper', 'scissors'], category: 'Games', description: 'Pierre-feuille-ciseaux', handler: 'games' }
];

// Games - Partie 2 (tous les jeux)
const gamesPart2 = [
  { name: 'slots', alias: ['slot', 'roulette', 'bet', 'jackpot', 'lottery', 'blackjack', 'poker', 'highcard', 'war', 'uno', 'memory', 'match', 'puzzle', 'quiz', 'trivia', 'riddle', 'guess', 'number', 'word', 'math', 'spelling', 'flag', 'country', 'capital', 'emojiquiz', 'scramble', 'hangman', 'tictactoe', 'connect4', 'sudoku', 'chess', 'checkers', 'bingo', 'domino', 'snakes', 'ladders', 'fish', 'hunt', 'mine', 'dig', 'explore', 'treasure', 'cave', 'forest', 'desert', 'ocean', 'island', 'dungeon', 'boss', 'quest', 'raid', 'battle', 'duel', 'arena', 'survival', 'escape', 'zombie', 'vampire', 'ninja', 'samurai', 'pirate', 'dragon', 'monster', 'alien', 'robot', 'space', 'race', 'runner', 'jump', 'climb', 'swim', 'fly', 'target', 'archery', 'shoot', 'throw', 'catch', 'balance', 'speed', 'luck', 'spin', 'wheel', 'mystery', 'box', 'reward', 'dailygame', 'weeklygame', 'daily', 'weekly', 'monthly', 'gift', 'giftbox', 'crate', 'loot', 'lootbox', 'rewardbox', 'bonus', 'bonusgame', 'coinhunt', 'goldhunt', 'diamond', 'emerald', 'ruby', 'crystal', 'gem', 'collect', 'collector', 'inventory', 'backpack', 'bag', 'storage', 'shop', 'market', 'buy', 'sell', 'trade', 'exchange', 'upgrade', 'level', 'levelup', 'xp', 'exp', 'ranking', 'topgame', 'score', 'points', 'coins', 'gold', 'cashgame', 'bank', 'vault', 'safe', 'heist', 'rob', 'steal', 'escape2', 'mission', 'adventure', 'journey', 'travel', 'voyage', 'camp', 'survivor', 'craft', 'build', 'forge', 'weapon', 'armor', 'shield', 'sword', 'axe', 'bow', 'gun', 'rifle', 'sniper', 'magic', 'spell', 'potion', 'heal', 'revive', 'attack', 'defend', 'guard', 'strike', 'combo', 'critical', 'damage', 'power', 'energy', 'stamina', 'health', 'life', 'revival', 'checkpoint', 'portal', 'teleport', 'galaxy', 'planet', 'moon', 'star', 'rocket', 'spaceship', 'meteor', 'asteroid', 'comet', 'universe', 'volcano', 'lava', 'ice', 'snow', 'storm', 'thunder', 'lightning', 'rain', 'wind', 'earth', 'fire', 'water', 'air', 'nature', 'jungle', 'river', 'mountain', 'valley', 'beach', 'castle', 'tower', 'temple', 'labyrinth', 'maze', 'prison', 'rescue', 'escort', 'protect', 'capture', 'conquer', 'empire', 'kingdom', 'village', 'city', 'town', 'campfire', 'night', 'day', 'sunrise', 'sunset', 'festival', 'party', 'celebrate', 'challenge', 'event', 'tournament', 'cup', 'league', 'season', 'final', 'practice', 'training', 'coach', 'master', 'studentgame', 'rookie', 'veteran', 'elite', 'mythic', 'epic', 'rare', 'common', 'legendary', 'ultimate', 'supreme', 'victory', 'defeat', 'draw', 'rematch', 'revenge', 'streak', 'combo2', 'multikill', 'firstblood', 'headshot', 'knockout', 'finish', 'surprise', 'secret', 'hidden', 'mystic', 'fortunegame', 'destiny', 'fate', 'chance', 'randomgame', 'luckyspin', 'megaspin', 'megabox', 'superbox', 'ultrabox', 'megajackpot', 'superreward', 'ultrareward', 'megabonus', 'dailyreward', 'weeklyreward', 'monthlyreward', 'gamehub', 'play1', 'startgame', 'coinflip', 'fight', 'boxing', 'dare', 'truthordare', 'hang', 'hm', 'maths', 'ganit', 'dado', 'dados', 'ttt', 'xo', 'truth', 'truthdare'], category: 'Games', description: 'Jeux de casino, stratégie, aventure...', handler: 'games' }
];

// ============================================================
// DOWNLOAD
// ============================================================
const downloads = [
  { name: 'alamy', alias: ['alamydl', 'alamydownload'], category: 'Download', description: 'Télécharge depuis Alamy', handler: 'downloads' },
  { name: 'facebook', alias: ['fb', 'fbdl'], category: 'Download', description: 'Télécharge depuis Facebook', handler: 'downloads' },
  { name: 'getty', alias: ['gettyvideo', 'gettydl'], category: 'Download', description: 'Télécharge depuis Getty', handler: 'downloads' },
  { name: 'gimage', alias: ['googleimage', 'gimg'], category: 'Download', description: 'Recherche Google Images', handler: 'downloads' },
  { name: 'gitclone', alias: ['githubdl', 'clone'], category: 'Download', description: 'Clone un dépôt GitHub', handler: 'downloads' },
  { name: 'instagram', alias: ['ig', 'igdl', 'insta'], category: 'Download', description: 'Télé
