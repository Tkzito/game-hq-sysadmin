#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Erro: Repositório não encontrado."
    exit 1
fi

CURRENT_BRANCH=$(git -C "$REPO_DIR" rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" != "feature/taxas-api" ]; then
    echo "Erro: A branch ativa atual não é 'feature/taxas-api' (está em '$CURRENT_BRANCH')."
    exit 1
fi

echo "Sucesso: Nova branch criada e ativa!"
exit 0
