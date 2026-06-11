#!/bin/bash
# validator.sh - Nível 78
set -euo pipefail

FILE="/home/operator/tentativas_invasao.txt"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo tentativas_invasao.txt não foi encontrado."
    exit 1
fi

CONTENT=$(cat "$FILE" | tr -d '[:space:]')

if [ "$CONTENT" != "4" ]; then
    echo "Falha: O número de falhas informado ($CONTENT) está incorreto. Conte as linhas com a palavra FAIL."
    exit 1
fi

# Verificar uso de wc no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -q "wc" "$HISTORY_FILE"; then
        echo "Falha: Não foi encontrado o comando 'wc' no histórico de comandos."
        exit 1
    fi
fi

echo "Sucesso: O número de tentativas de invasão (FAIL) foi contado corretamente!"
exit 0
