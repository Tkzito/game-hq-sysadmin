#!/bin/bash
# validator.sh - Valida se o jogador documentou o script de forma legível.
set -euo pipefail

SCRIPT="/home/operator/limpar_logs.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo limpar_logs.sh não existe."
    exit 1
fi

# Contar linhas comentadas (que começam com # mas não contêm !)
COMMENT_COUNT=$(grep -E "^#[[:space:]]*[^!]" "$SCRIPT" | wc -l)

if [ "$COMMENT_COUNT" -lt 2 ]; then
    echo "Falha: O script deve conter pelo menos 2 linhas de comentários explicando o que o script faz."
    exit 1
fi

echo "Sucesso: O script foi documentado profissionalmente!"
exit 0
