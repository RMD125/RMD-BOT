#!/bin/bash
echo "=========================================="
echo "🚀 Installation de RMD-BOT sur Termux"
echo "👑 Creator: RMD125"
echo "=========================================="

pkg update -y
pkg upgrade -y
pkg install nodejs git ffmpeg -y

echo "✅ Dépendances système installées"

git clone https://github.com/RMD125/RMD-BOT.git
cd RMD-BOT

npm install

echo "=========================================="
echo "✅ Installation terminée!"
echo "📁 Dossier: $(pwd)"
echo "🚀 Lancement: npm start"
echo "🔧 Éditez config.json avec vos infos"
echo "=========================================="

chmod +x deploy-termux.sh
