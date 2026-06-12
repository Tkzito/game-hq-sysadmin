#!/bin/bash
set -euo pipefail

USAGE_FILE="/home/operator/.cluster_usage"

if [ ! -f "$USAGE_FILE" ]; then
    echo "Erro: Nenhum comando de cluster foi executado."
    exit 1
fi

# Verify if get nodes and describe cluster were run
RAN_GET_NODES=$(grep -E "get nodes" "$USAGE_FILE" || true)
RAN_DESCRIBE=$(grep -E "describe cluster" "$USAGE_FILE" || true)

if [ -n "$RAN_GET_NODES" ] && [ -n "$RAN_DESCRIBE" ]; then
    echo "Sucesso: Auditoria de integridade do cluster executada com sucesso!"
    exit 0
else
    echo "Erro: Voce deve interrogar o status dos nós usando 'clusterctl get nodes' e auditar a saude do cluster com 'clusterctl describe cluster'."
    exit 1
fi
