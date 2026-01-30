#!/bin/bash

# Configurações de Diretórios
PROJECT_DIR="/home/guilherme/angular_filos_site"
ASSETS_CARROSSEL="$PROJECT_DIR/src/assets/carrossel"
DIST_DIR="$PROJECT_DIR/dist/filos/browser"

echo "🚀 Iniciando Deploy Automatizado - Faculdade Filos"
cd $PROJECT_DIR || { echo "❌ Erro: Diretório não encontrado"; exit 1; }

# 1. Sincronização de Código
echo "📥 Puxando atualizações do repositório..."
git pull origin main

# 2. Automação do Carrossel (Geração do Manifesto JSON)
echo "🖼️  Mapeando novas imagens em assets/carrossel..."
if [ -d "$ASSETS_CARROSSEL" ]; then
    cd "$ASSETS_CARROSSEL"
    # Remove manifesto antigo e gera um novo com arquivos .webp, .jpg ou .png
    rm -f manifest.json
    ls | grep -E '\.(webp|jpg|jpeg|png)$' | jq -R . | jq -s '{images: .}' > manifest.json
    cd $PROJECT_DIR
    echo "✅ Manifesto do carrossel atualizado com sucesso."
else
    echo "⚠️  Aviso: Pasta de carrossel não encontrada em src/assets/carrossel"
fi

# 3. Build do Projeto Angular 18
echo "📦 Instalando dependências e gerando build..."
npm install --legacy-peer-deps
npm run build

# 4. Ajustes Críticos de Segurança e Permissões (Nginx)
echo "🔒 Aplicando políticas de permissão..."
# Permite que o Nginx (www-data) percorra sua pasta home
chmod +x /home/guilherme

# Garante que o Nginx seja o dono do grupo da pasta dist
sudo chown -R guilherme:www-data "$PROJECT_DIR/dist"

# Define permissões: 755 para pastas (leitura/execução) e 644 para arquivos (leitura)
sudo find "$PROJECT_DIR/dist" -type d -exec chmod 755 {} \;
sudo find "$PROJECT_DIR/dist" -type f -exec chmod 644 {} \;

# 5. Reinicialização de Serviços
echo "🔄 Reiniciando PM2 e Nginx..."
pm2 restart filos-site
sudo systemctl reload nginx

echo "--------------------------------------------------"
echo "✅ DEPLOY FINALIZADO COM SUCESSO!"
echo "🌐 Site: https://faculdadefilos.edu.br"
echo "--------------------------------------------------"