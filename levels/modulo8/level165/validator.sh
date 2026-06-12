#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.cluster_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O cluster nao foi inicializado."
    exit 1
fi

# Check if eco-node-3 is gone
HAS_NODE3=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    exists = any(n['name'] == 'eco-node-3' for n in data.get('nodes', []))
    print('1' if exists else '0')
except Exception as e:
    print('1')
")

if [ "$HAS_NODE3" = "0" ]; then
    echo "Sucesso: O nó eco-node-3 foi removido e os pods foram redistribuidos!"
    exit 0
else
    echo "Erro: O nó eco-node-3 ainda esta registrado no cluster. Delete-o com 'clusterctl delete node eco-node-3'."
    exit 1
fi
