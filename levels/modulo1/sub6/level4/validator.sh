#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico nao encontrado."
    exit 1
fi
if grep -q "Dispositivo.\*Falha" "$HISTORY_FILE"; then
    echo "Sucesso: Padrao de curingas e repeticoes dominado!"
    exit 0
else
    echo "Falha: Regex 'Dispositivo.*Falha' nao encontrada no historico."
    exit 1
fi
