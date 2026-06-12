#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.docker_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

# Check if legacy-app:v0.1.0 image is gone
HAS_LEGACY=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    legacy_exists = any(img['id'] == 'd1a2b3c4d5e6' or img['repository'] == 'legacy-app' for img in data.get('images', []))
    print('1' if legacy_exists else '0')
except Exception as e:
    print('1')
")

# Check if redis image still exists
HAS_REDIS=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    redis_exists = any(img['repository'] == 'redis' for img in data.get('images', []))
    print('1' if redis_exists else '0')
except Exception as e:
    print('0')
")

if [ "$HAS_LEGACY" = "0" ] && [ "$HAS_REDIS" = "1" ]; then
    echo "Sucesso: Imagens obsoletas removidas com sucesso!"
    exit 0
else
    echo "Erro: A imagem 'legacy-app' ainda existe ou a imagem 'redis' foi removida incorretamente."
    exit 1
fi
