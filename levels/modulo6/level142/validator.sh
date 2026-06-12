#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Erro: Repositório não encontrado."
    exit 1
fi

# Verificar se há commits
if ! git -C "$REPO_DIR" rev-parse --git-dir > /dev/null 2>&1; then
    echo "Erro: Repositório não possui nenhum commit."
    exit 1
fi

# Verificar o último commit
LAST_COMMIT_MSG=$(git -C "$REPO_DIR" log -1 --pretty=%B)
if [[ ! "$LAST_COMMIT_MSG" =~ "feat: setup inicial" ]]; then
    echo "Erro: O último commit deve conter a mensagem 'feat: setup inicial da API de pagamentos'."
    exit 1
fi

# Verificar se os arquivos estão indexados/comitados e se o status está limpo
STATUS=$(git -C "$REPO_DIR" status --porcelain)
if echo "$STATUS" | grep -qE '^(M |A |R |C |M|A|R|C) (app.js|config.env)'; then
    echo "Erro: Os arquivos app.js e config.env ainda têm modificações não consolidadas."
    exit 1
fi

echo "Sucesso: O primeiro commit com os novos arquivos foi realizado!"
exit 0
