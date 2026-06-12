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

HAS_NETWORK_ISOLATION=$(python3 -c "
try:
    import yaml
    import sys
    with open('$COMPOSE_FILE') as f:
        config = yaml.safe_load(f)
    
    services = config.get('services', {})
    networks = config.get('networks', {})
    
    # We should have at least two networks defined
    if len(networks) < 2:
        print('0')
        sys.exit(0)
        
    # Find backend, frontend/web and redis service names
    redis_svc = next((s for s in services if 'redis' in s), None)
    backend_svc = next((s for s in services if 'backend' in s or 'node' in s or 'web' in s and 'front' not in s), None)
    frontend_svc = next((s for s in services if 'frontend' in s or 'react' in s or 'front' in s), None)
    
    if not (redis_svc and backend_svc and frontend_svc):
        # Fallback to general validation if names are different
        print('0')
        sys.exit(0)
        
    redis_nets = services[redis_svc].get('networks', [])
    backend_nets = services[backend_svc].get('networks', [])
    frontend_nets = services[frontend_svc].get('networks', [])
    
    # Standardize to list if they are dicts/none
    if isinstance(redis_nets, dict): redis_nets = list(redis_nets.keys())
    if isinstance(backend_nets, dict): backend_nets = list(backend_nets.keys())
    if isinstance(frontend_nets, dict): frontend_nets = list(frontend_nets.keys())
    
    # Redis should be in 1 network. Backend in 2. Frontend in 1.
    # Frontend and Redis must NOT share any network.
    shared_nets = set(redis_nets) & set(frontend_nets)
    
    if len(redis_nets) == 1 and len(backend_nets) >= 2 and len(frontend_nets) == 1 and len(shared_nets) == 0:
        print('1')
    else:
        print('0')
except Exception as e:
    # If pyyaml is not installed or parsing failed, do a relaxed string matching
    print('2')
")

if [ "$HAS_NETWORK_ISOLATION" = "0" ]; then
    echo "Erro: Isolamento de redes invalido. O banco Redis nao deve compartilhar redes com o frontend, e o backend deve estar conectado a ambas."
    exit 1
elif [ "$HAS_NETWORK_ISOLATION" = "2" ]; then
    # Fallback to grep validation
    # Let's count network names or occurrences
    PUBLIC_NET=$(grep -E "(public|external)" "$COMPOSE_FILE" || true)
    PRIVATE_NET=$(grep -E "(private|internal|db-net|backend-net)" "$COMPOSE_FILE" || true)
    if [ -n "$PUBLIC_NET" ] && [ -n "$PRIVATE_NET" ]; then
        echo "Sucesso: Redes isoladas configuradas (Grep fallback)."
        exit 0
    else
        echo "Erro: Nao foi possivel validar as duas redes (publica/privada)."
        exit 1
    fi
else
    # Started containers check
    STARTED_CONTAINERS=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    print('1' if len(data.get('containers', [])) >= 3 else '0')
except:
    print('0')
")
    if [ "$STARTED_CONTAINERS" = "1" ]; then
        echo "Sucesso: Redes isoladas configuradas e stack de containers iniciada!"
        exit 0
    else
        echo "Erro: Certifique-se de executar 'docker compose up -d' apos configurar as redes."
        exit 1
    fi
fi
