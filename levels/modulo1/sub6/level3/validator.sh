#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico vazio."
    exit 1
fi
if grep -qE "grep.*Setor\s+\[A-F\]\[1-5\]" "$HISTORY_FILE" || grep -qE "grep.*Setor\s*\\[A-F\\]\\[1-5\\]" "$HISTORY_FILE"; then
    echo "Sucesso: Classes de caracteres aplicadas com precisao!"
    exit 0
else
    echo "Falha: Comando grep correto usando [A-F][1-5] nao encontrado no historico."
    exit 1
fi
