#!/bin/bash
set -euo pipefail

USAGE_FILE="/home/operator/.docker_usage"

if [ ! -f "$USAGE_FILE" ]; then
    echo "Erro: Nenhum comando Docker foi executado ainda."
    exit 1
fi

# Check if 'stats' was run
RAN_STATS=$(grep -E "stats" "$USAGE_FILE" || true)

# Check if 'logs' was run with queue-worker
RAN_LOGS=$(grep -E "logs.*queue-worker" "$USAGE_FILE" || true)

if [ -n "$RAN_STATS" ] && [ -n "$RAN_LOGS" ]; then
    echo "Sucesso: Diagnostico de logs e estatisticas realizado com sucesso!"
    exit 0
else
    echo "Erro: Voce deve analisar o consumo de hardware do cluster com 'docker stats' e inspecionar logs com 'docker logs [CONTAINER_NAME]'."
    exit 1
fi
