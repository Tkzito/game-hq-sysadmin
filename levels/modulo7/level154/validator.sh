#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.docker_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

# Check if node-web is running with image app:v1 and ports 80:3000
HAS_NODE_WEB=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    active = any(
        c['name'] == 'node-web' and 
        ('app:v1' in c['image'] or c['image'] == 'app') and 
        (c['ports'] == '80:3000' or c['ports'] == '80:3000/tcp') 
        for c in data.get('containers', [])
    )
    print('1' if active else '0')
except Exception as e:
    print('0')
")

if [ "$HAS_NODE_WEB" = "1" ]; then
    echo "Sucesso: Porta mapeada e container ativado com sucesso!"
    exit 0
else
    echo "Erro: O container com nome 'node-web' e imagem 'app:v1' nao esta rodando na porta 80:3000."
    exit 1
fi
