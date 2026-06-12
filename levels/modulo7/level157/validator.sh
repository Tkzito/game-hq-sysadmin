#!/bin/bash
set -euo pipefail

COMPOSE_FILE="/home/operator/docker-compose.yml"
STATE_FILE="/home/operator/.docker_state.json"

if [ ! -f "$COMPOSE_FILE" ]; then
    echo "Erro: O arquivo 'docker-compose.yml' nao foi encontrado em /home/operator/"
    exit 1
fi

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

# Convert content to lowercase for easier validation
CONTENT=$(tr '[:upper:]' '[:lower:]' < "$COMPOSE_FILE")

# Check if services react/frontend, node/backend, and redis are declared
HAS_REACT=$(echo "$CONTENT" | grep -E "react|frontend" || true)
HAS_NODE=$(echo "$CONTENT" | grep -E "node|backend" || true)
HAS_REDIS=$(echo "$CONTENT" | grep -E "redis" || true)

if [ -z "$HAS_REACT" ] || [ -z "$HAS_NODE" ] || [ -z "$HAS_REDIS" ]; then
    echo "Erro: O docker-compose.yml deve conter definicoes para os servicos frontend/react, backend/node e redis."
    exit 1
fi

# Check if containers were started
STARTED_CONTAINERS=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    containers = [c['name'] for c in data.get('containers', [])]
    # Check if there are at least 3 containers representing the stack
    has_three = len(containers) >= 3
    print('1' if has_three else '0')
except Exception as e:
    print('0')
")

if [ "$STARTED_CONTAINERS" = "1" ]; then
    echo "Sucesso: Multi-servicos orquestrados com sucesso pelo docker compose!"
    exit 0
else
    echo "Erro: Os servicos nao parecem estar rodando. Certifique-se de executar 'docker compose up -d'."
    exit 1
fi
