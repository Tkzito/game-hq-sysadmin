#!/bin/bash
# validator.sh - Nível 80
set -euo pipefail

FILE="/home/operator/config_final.cfg"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo config_final.cfg não foi encontrado."
    exit 1
fi

EXPECTED=$(cat << 'EOF'
CONF_HOSTNAME=AURAPORTAL
CONF_ENV=PROD
CONF_VERSION=7.0
EOF
)

ACTUAL=$(cat "$FILE" | xargs)

if [ "$ACTUAL" != "$(echo "$EXPECTED" | xargs)" ]; then
    echo "Falha: O conteúdo de config_final.cfg está incorreto ou incompleto."
    exit 1
fi

# Verificar uso de < e > no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -q "<" "$HISTORY_FILE" || ! grep -q ">" "$HISTORY_FILE"; then
        echo "Falha: Você deve utilizar o redirecionamento de entrada '<' e o de saída '>' no mesmo comando."
        exit 1
    fi
fi

echo "Sucesso: Redirecionamento de entrada (stdin) '<' e saída '>' executado perfeitamente!"
exit 0
