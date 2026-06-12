#!/bin/bash
set -euo pipefail

STATE_FILE="/home/operator/.docker_state.json"

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

# Check if db-mysql is running with mysql image and correct volume mapping
HAS_MYSQL_VOLUME=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    active = any(
        c['name'] == 'db-mysql' and 
        'mysql' in c['image'] and 
        '/var/data/mysql:/var/lib/mysql' in c['volumes']
        for c in data.get('containers', [])
    )
    print('1' if active else '0')
except Exception as e:
    print('0')
")

if [ ! -d "/var/data/mysql" ]; then
    echo "Erro: O diretorio local '/var/data/mysql' nao foi criado no host."
    exit 1
fi

if [ "$HAS_MYSQL_VOLUME" = "1" ]; then
    echo "Sucesso: Volume montado e banco persistido com sucesso!"
    exit 0
else
    echo "Erro: O container 'db-mysql' com imagem 'mysql' nao esta rodando com o mapeamento de volume correto (/var/data/mysql:/var/lib/mysql)."
    exit 1
fi
