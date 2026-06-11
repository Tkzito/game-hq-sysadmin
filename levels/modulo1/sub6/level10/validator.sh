#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico nao localizado."
    exit 1
fi
if grep -qE "grep.*(\^|\^\[).*([0-9a-fA-F]|\[0-9a-fA-F\]).*\{32\}(\$|\\$)" "$HISTORY_FILE"; then
    echo "Sucesso: Chave hexadecimal de 32 digitos validada com sucesso!"
    exit 0
else
    echo "Falha: Comando grep correto nao localizado no historico."
    exit 1
fi
