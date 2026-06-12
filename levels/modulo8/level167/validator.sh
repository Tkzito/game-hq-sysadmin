#!/bin/bash
set -euo pipefail

VIOLATION_FILE="/home/operator/violation.txt"
if [ ! -f "$VIOLATION_FILE" ]; then
    VIOLATION_FILE="/home/operator/violation.log"
fi

if [ ! -f "$VIOLATION_FILE" ]; then
    echo "Erro: O arquivo 'violation.txt' contendo a linha de log da violacao nao foi encontrado em /home/operator/"
    exit 1
fi

CONTENT=$(cat "$VIOLATION_FILE")

if echo "$CONTENT" | grep -q "SECURITY_VIOLATION" && echo "$CONTENT" | grep -q "0xEF92A31B8C"; then
    echo "Sucesso: Log violado localizado e exportado corretamente!"
    exit 0
else
    echo "Erro: O arquivo exportado nao contem a linha com a violacao de seguranca correta (deve conter SECURITY_VIOLATION e a assinatura 0xEF92A31B8C)."
    exit 1
fi
