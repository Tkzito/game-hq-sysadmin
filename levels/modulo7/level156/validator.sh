#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.docker_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

# Check if a container running image api-server has correct env vars
HAS_ENV_VARS=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    active = any(
        'api-server' in c['image'] and 
        c.get('env', {}).get('NODE_ENV') == 'production' and 
        c.get('env', {}).get('DB_PASS') == 'secret_key'
        for c in data.get('containers', [])
    )
    print('1' if active else '0')
except Exception as e:
    print('0')
")

if [ "$HAS_ENV_VARS" = "1" ]; then
    echo "Sucesso: Variaveis de ambiente injetadas com sucesso!"
    exit 0
else
    echo "Erro: O container com imagem 'api-server' nao foi iniciado com as variaveis NODE_ENV=production e DB_PASS=secret_key."
    exit 1
fi
