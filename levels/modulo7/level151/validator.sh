#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.docker_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

# Check if redis-cache is running
HAS_REDIS=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    redis_active = any(c['name'] == 'redis-cache' and 'redis' in c['image'] for c in data.get('containers', []))
    print('1' if redis_active else '0')
except Exception as e:
    print('0')
")

if [ "$HAS_REDIS" = "1" ]; then
    echo "Sucesso: Redis cache iniciado com sucesso!"
    exit 0
else
    echo "Erro: O container com nome 'redis-cache' e imagem 'redis' nao foi encontrado ou nao esta rodando."
    exit 1
fi
