#!/bin/bash
# =============================================================
# deploy.sh — Atualiza o Game HQ Demo no WSL (bunker)
# Uso: bash deploy.sh
# =============================================================
set -e

CONTAINER_NAME="bunker-game-demo"
IMAGE_NAME="bunker-game-demo"
PORT="8085"
PROJECT_DIR="/home/user/bunker-game-html"

echo "🎮 Game HQ — Deploy iniciado $(date '+%d/%m/%Y %H:%M:%S')"
echo "---------------------------------------------------"

cd "$PROJECT_DIR"

echo "📥 [1/4] Atualizando código via git pull..."
git pull origin main

echo "🐳 [2/4] Construindo nova imagem Docker..."
docker build -t "$IMAGE_NAME" .

echo "⏹️  [3/4] Parando e removendo container antigo..."
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

echo "🚀 [4/4] Subindo novo container..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart=unless-stopped \
  -p "${PORT}:80" \
  "$IMAGE_NAME"

echo "---------------------------------------------------"
echo "✅ Deploy concluído! Jogo disponível em:"
echo "   http://100.108.212.80:${PORT}"
echo "   http://localhost:${PORT}"
