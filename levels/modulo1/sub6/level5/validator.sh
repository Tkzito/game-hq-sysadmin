#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico ausente."
    exit 1
fi
if grep -qE "grep -E.*(CRITICAL\|FATAL|FATAL\|CRITICAL)" "$HISTORY_FILE" || grep -qE "egrep.*(CRITICAL\|FATAL|FATAL\|CRITICAL)" "$HISTORY_FILE"; then
    echo "Sucesso: Alternancia estendida executada com sucesso!"
    exit 0
else
    echo "Falha: Nao foi encontrado uso do grep -E com alternancia para CRITICAL e FATAL."
    exit 1
fi
