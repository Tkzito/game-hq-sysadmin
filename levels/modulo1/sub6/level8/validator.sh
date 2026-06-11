#!/bin/bash
set -euo pipefail
HISTORY_FILE="/home/operator/.bash_history"
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Historico ausente."
    exit 1
fi
if grep -qE "grep -Eo|grep -oE" "$HISTORY_FILE"; then
    echo "Sucesso: Extracao cirurgica com grep -o validada!"
    exit 0
else
    echo "Falha: Uso de grep -Eo para extrair emails nao detectado no historico."
    exit 1
fi
