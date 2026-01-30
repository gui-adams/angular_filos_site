#!/bin/bash

# Configurações de Variáveis
USER_NAME="guilherme"
PROJECT_DIR="/home/guilherme/angular_filos_site"
ASSETS_DIR="$PROJECT_DIR/src/assets/carrossel"

echo "🚀 Iniciando Deploy Seguro - Faculdade Filos"

# Garante que estamos no diretório correto
cd "$PROJECT_DIR" || { echo "❌ Erro: Diretório não encontrado"; exit 1; }

# 1. Atualização de Código
# Executado como guilherme para manter as chaves SSH e permissões do Git
echo "📥 Puxando atualizações do Git..."
git pull origin main || { echo "❌ Erro no Git Pull. Verifique suas chaves SSH."; exit 1; }

# 2. Automação do Manifesto de Imagens
# Gera o JSON automaticamente para o carrossel não quebrar
echo "🖼️  Sincronizando fotos do carrossel..."
if [ -d "$ASSETS_DIR" ]; then
    cd "$ASSETS_DIR"
    rm -f manifest.json
    # Lista arquivos reais e gera o JSON (requer jq instalado)
    ls | grep -E '\.(webp|jpg|jpeg|png)$' | jq -R . | jq -s '{images: .}' > manifest.json
    cd "$PROJECT_DIR"
else
    echo "⚠️  Aviso: Pasta assets/carrossel não encontrada."
fi

# 3. Build da Aplicação
echo "📦 Instalando dependências e compilando..."
npm install --legacy-peer-deps
npm run build || { echo "❌ Erro no Build do Angular"; exit 1; }

# 4. Segurança de Arquivos e Permissões de Servidor
# Aqui usamos sudo para garantir que o Nginx (www-data) possa ler os arquivos
echo "🔒 Ajustando permissões de segurança..."
sudo chown -R $USER_NAME:www-data "$PROJECT_DIR/dist"
sudo find "$PROJECT_DIR/dist" -type d -exec chmod 755 {} \;
sudo find "$PROJECT_DIR/dist" -type f -exec chmod 644 {} \;

# 5. Reinicialização dos Processos
echo "🔄 Reiniciando serviços..."
# Reinicia o PM2 garantindo que use o ambiente do usuário guilherme
pm2 restart filos-site || pm2 start dist/filos/server/main.server.mjs --name "filos-site"
sudo systemctl reload nginx

echo "--------------------------------------------------"
echo "✅ DEPLOY FINALIZADO COM SUCESSO!"
echo "🌐 Acesse: https://faculdadefilos.edu.br"
echo "--------------------------------------------------"