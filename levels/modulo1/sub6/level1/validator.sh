#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando executado no terminal ainda."
    exit 1
fi
if grep -qE "grep.*['"|]\^ERROR:" "$HISTORY_FILE" || grep -qE "grep.*\^ERROR:" "$HISTORY_FILE"; then
    echo "Sucesso: Logica regex de inicio de linha "^" aplicada corretamente!"
    exit 0
else
    echo "Falha: Nao foi encontrado o uso correto da regex '^ERROR:' com grep."
    exit 1
fi
