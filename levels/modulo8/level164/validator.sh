#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.cluster_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O cluster nao foi inicializado."
    exit 1
fi

# Check how many pods are running
PODS_COUNT=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    print(len(data.get('pods', [])))
except Exception as e:
    print('0')
")

if [ "$PODS_COUNT" = "5" ]; then
    echo "Sucesso: O manifesto foi aplicado e 5 pods estao rodando no cluster!"
    exit 0
else
    echo "Erro: O numero de pods ativos no cluster e $PODS_COUNT. Voce deve aplicar o manifesto usando 'clusterctl apply -f deployment.yaml'."
    exit 1
fi
