#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico nao localizado."
    exit 1
fi
if grep -qE "grep -v.*(\^\\$|\^\\[:space:\\]\\*\$)" "$HISTORY_FILE" || grep -qE "grep -v.*'\^\s*\$'" "$HISTORY_FILE" || grep -q -e '-v "^[[:space:]]*$"' "$HISTORY_FILE"; then
    echo "Sucesso: Limpeza de linhas vazias e espacos em branco efetuada!"
    exit 0
else
    echo "Falha: Nao foi encontrado o comando grep -v com regex correta de limpeza de linhas vazias."
    exit 1
fi
