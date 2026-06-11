#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico ausente."
    exit 1
fi
if grep -qE "grep.*2026-\[0-9\]" "$HISTORY_FILE" && grep -qE "\{2\}" "$HISTORY_FILE"; then
    echo "Sucesso: Regex de data ISO capturada com perfeicao!"
    exit 0
else
    echo "Falha: O comando grep com a regex de data 2026-MM-DD nao foi encontrado no historico."
    exit 1
fi
