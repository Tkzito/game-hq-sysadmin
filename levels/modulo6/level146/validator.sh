#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"
BARE_DIR="/var/git/api.git"

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Erro: Repositório local não encontrado."
    exit 1
fi

# Verificar se o remote existe e aponta para a URL correta
REMOTE_URL=$(git -C "$REPO_DIR" remote get-url origin 2>/dev/null || echo "")
if [ "$REMOTE_URL" != "git@github.com:techvanguard/api.git" ]; then
    echo "Erro: O repositório remoto 'origin' não está configurado ou não aponta para 'git@github.com:techvanguard/api.git'."
    exit 1
fi

# Verificar se os commits locais foram enviados para o servidor bare
LOCAL_HASH=$(git -C "$REPO_DIR" rev-parse HEAD 2>/dev/null || echo "1")
BARE_HASH=$(git -C "$BARE_DIR" rev-parse master 2>/dev/null || echo "2")

if [ "$LOCAL_HASH" != "$BARE_HASH" ]; then
    echo "Erro: As alterações locais não foram enviadas (git push) para o repositório remoto."
    exit 1
fi

echo "Sucesso: Repositório remoto configurado e sincronizado via push!"
exit 0
