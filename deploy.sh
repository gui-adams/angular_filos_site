#!/bin/bash
PROJECT_DIR="/home/guilherme/angular_filos_site"

echo "🚀 Iniciando deploy como usuário: $USER"
cd $PROJECT_DIR || exit

# 1. Atualizar Código (Como guilherme)
git pull origin main

# 2. Manifesto do Carrossel (Como guilherme)
echo "🖼️ Atualizando fotos..."
cd src/assets/carrossel
rm -f manifest.json
ls | grep -E '\.(webp|jpg|png)$' | jq -R . | jq -s '{images: .}' > manifest.json
cd $PROJECT_DIR

# 3. Build (Como guilherme)
npm install --legacy-peer-deps
npm run build

# 4. Comandos que PRECISAM de sudo (Permissões de Servidor)
echo "🔒 Ajustando permissões do servidor..."
sudo chown -R guilherme:www-data dist/
sudo find dist/ -type d -exec chmod 755 {} \;
sudo find dist/ -type f -exec chmod 644 {} \;

# 5. Reiniciar Serviços
pm2 restart filos-site
sudo systemctl reload nginx

echo "✅ Tudo pronto na Faculdade Filos!"