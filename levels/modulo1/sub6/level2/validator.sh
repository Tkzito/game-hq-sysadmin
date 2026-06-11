#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando executado."
    exit 1
fi
if grep -qE "grep.*\\\[OK\\\]\\\$" "$HISTORY_FILE" || grep -qE "grep.*'\\\[OK\\\]\\$'" "$HISTORY_FILE" || grep -qE "grep.*"\\\[OK\\\]\$"" "$HISTORY_FILE" || grep -q -e '\[OK\]$' "$HISTORY_FILE"; then
    echo "Sucesso: Regex de final de linha '$' validada!"
    exit 0
else
    echo "Falha: O comando grep com a regex correta de fim de linha contendo \[OK\]$ nao foi localizado no historico."
    exit 1
fi
