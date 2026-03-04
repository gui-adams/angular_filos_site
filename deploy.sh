#!/bin/bash
set -e

USER_NAME="guilherme"
PROJECT_DIR="/home/guilherme/angular_filos_site"
ASSETS_DIR="$PROJECT_DIR/src/assets/carrossel"
LOGS_DIR="$PROJECT_DIR/logs"

echo "🚀 Iniciando Deploy Seguro - Faculdade Filos"

cd "$PROJECT_DIR" || { echo "❌ Erro: Diretório não encontrado"; exit 1; }

# logs (pm2)
mkdir -p "$LOGS_DIR"

echo "📥 Puxando atualizações do Git..."
git pull origin main || { echo "❌ Erro no Git Pull. Verifique suas chaves SSH."; exit 1; }

echo "🖼️  Sincronizando fotos do carrossel..."
if [ -d "$ASSETS_DIR" ]; then
  cd "$ASSETS_DIR"
  rm -f manifest.json

  # requer jq
  ls | grep -E '\.(webp|jpg|jpeg|png)$' | jq -R . | jq -s '{images: .}' > manifest.json

  cd "$PROJECT_DIR"
else
  echo "⚠️  Aviso: Pasta assets/carrossel não encontrada."
fi

echo "📦 Instalando dependências..."
# preferível em deploy (se existir package-lock)
if [ -f "$PROJECT_DIR/package-lock.json" ]; then
  npm ci --legacy-peer-deps
else
  npm install --legacy-peer-deps
fi

echo "🧠 Gerando arquivos de SEO (sitemap/robots/prerender-routes)..."
npm run seo:gen || { echo "❌ Erro ao gerar SEO files"; exit 1; }

echo "🏗️ Build Angular (SSR + prerender)..."
npm run build || { echo "❌ Erro no Build do Angular"; exit 1; }

echo "🔒 Ajustando permissões de segurança..."
sudo chown -R "$USER_NAME":www-data "$PROJECT_DIR/dist"
sudo find "$PROJECT_DIR/dist" -type d -exec chmod 755 {} \;
sudo find "$PROJECT_DIR/dist" -type f -exec chmod 644 {} \;

echo "🔄 Reiniciando serviços (PM2 + Nginx)..."
# usa o ecosystem.config.cjs
pm2 startOrRestart "$PROJECT_DIR/ecosystem.config.cjs" --update-env
pm2 save
sudo systemctl reload nginx

echo "--------------------------------------------------"
echo "✅ DEPLOY FINALIZADO COM SUCESSO!"
echo "🌐 Acesse: https://faculdadefilos.edu.br"
echo "--------------------------------------------------"