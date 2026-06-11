#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico nao localizado."
    exit 1
fi
if grep -qE "grep -E.*(\[A-Z\]\\{3\\}-|\[A-Z\]\{3\}-).*(\[0-9\]\\{4\\}|\[0-9\]\{4\})" "$HISTORY_FILE" || grep -qE "egrep.*(\[A-Z\]\\{3\\}-|\[A-Z\]\{3\}-).*(\[0-9\]\\{4\\}|\[0-9\]\{4\})" "$HISTORY_FILE"; then
    echo "Sucesso: Quantificadores aplicados com precisao milimetrica!"
    exit 0
else
    echo "Falha: Regex com quantificadores {3} e {4} nao encontrada no historico."
    exit 1
fi
