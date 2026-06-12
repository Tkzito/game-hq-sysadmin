#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Erro: Repositório não encontrado."
    exit 1
fi

CURRENT_BRANCH=$(git -C "$REPO_DIR" rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "Erro: Você precisa voltar para a branch 'master' para realizar o merge."
    exit 1
fi

# Verificar se as alterações de feature/taxas-api estão presentes na master
if ! grep -q "TAX_RATE" "$REPO_DIR/app.js"; then
    echo "Erro: As alterações da branch 'feature/taxas-api' não foram encontradas na 'master'."
    exit 1
fi

# Verificar se o histórico de commits contém o commit feito na branch
LOG_CONTAINS_COMMIT=$(git -C "$REPO_DIR" log --grep="feat: adiciona taxa de transação")
if [ -z "$LOG_CONTAINS_COMMIT" ]; then
    echo "Erro: O commit da branch 'feature/taxas-api' não está presente no histórico da 'master'."
    exit 1
fi

echo "Sucesso: Branch feature/taxas-api mesclada na master com sucesso!"
exit 0
