#!/bin/bash
set -euo pipefail

# Check if Dockerfile exists in /home/operator or /home/operator/backend
DF_FILE="/home/operator/Dockerfile"
if [ ! -f "$DF_FILE" ]; then
    DF_FILE="/home/operator/backend/Dockerfile"
fi

if [ ! -f "$DF_FILE" ]; then
    echo "Erro: O arquivo 'Dockerfile' nao foi encontrado em /home/operator/ ou /home/operator/backend/"
    exit 1
fi

# Validate Dockerfile
DF_CONTENT=$(tr '[:upper:]' '[:lower:]' < "$DF_FILE")
if ! echo "$DF_CONTENT" | grep -q "from" || ! echo "$DF_CONTENT" | grep -q "alpine"; then
    echo "Erro: O Dockerfile do backend deve usar uma imagem base Alpine (ex: alpine, node:alpine, etc.)."
    exit 1
fi

COMPOSE_FILE="/home/operator/docker-compose.yml"
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "Erro: O arquivo 'docker-compose.yml' nao foi encontrado em /home/operator/"
    exit 1
fi

# Verify docker-compose
STATE_FILE="/home/operator/.docker_state.json"
if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O Docker nao foi inicializado."
    exit 1
fi

VALID_COMPOSE=$(python3 -c "
try:
    import yaml
    import sys
    with open('$COMPOSE_FILE') as f:
        config = yaml.safe_load(f)
    
    services = config.get('services', {})
    networks = config.get('networks', {})
    
    # Needs web (or backend) and redis
    web_svc = next((s for s in services if 'web' in s or 'backend' in s), None)
    redis_svc = next((s for s in services if 'redis' in s), None)
    
    if not web_svc or not redis_svc:
        print('0') # Missing services
        sys.exit(0)
        
    web_ports = services[web_svc].get('ports', [])
    redis_ports = services[redis_svc].get('ports', [])
    
    # Web must map port 80
    has_port_80 = False
    for p in web_ports:
        if str(p).startswith('80:') or str(p) == '80':
            has_port_80 = True
            
    # Redis must NOT expose ports to host
    if redis_ports:
        print('0')
        sys.exit(0)
        
    # Isolation: Must use networks
    web_nets = services[web_svc].get('networks', [])
    redis_nets = services[redis_svc].get('networks', [])
    
    if not web_nets or not redis_nets:
        print('0')
        sys.exit(0)
        
    # Must have volumes for web (logs)
    web_vols = services[web_svc].get('volumes', [])
    if not web_vols:
        print('0')
        sys.exit(0)
        
    if has_port_80:
        print('1')
    else:
        print('0')
except Exception as e:
    # If parsing fails, return a code to fall back to basic grep
    print('2')
")

if [ "$VALID_COMPOSE" = "0" ]; then
    echo "Erro: O arquivo docker-compose.yml nao atende a todas as especificacoes (servico web exposto na porta 80, redis isolado sem portas expostas, redes e volumes configurados)."
    exit 1
elif [ "$VALID_COMPOSE" = "2" ]; then
    # Grep fallback
    # Check if web is in compose, redis is in compose, and no ports exposed for redis
    HAS_WEB=$(grep -E "(web|backend):" "$COMPOSE_FILE" || true)
    HAS_REDIS=$(grep -E "redis:" "$COMPOSE_FILE" || true)
    if [ -n "$HAS_WEB" ] && [ -n "$HAS_REDIS" ]; then
        echo "Sucesso: docker-compose validado (Grep fallback)."
        exit 0
    else
        echo "Erro: docker-compose.yml incompleto."
        exit 1
    fi
else
    # Check if compose was started
    STARTED_CONTAINERS=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    containers = [c['name'] for c in data.get('containers', [])]
    print('1' if len(containers) >= 2 else '0')
except:
    print('0')
")

    if [ "$STARTED_CONTAINERS" = "1" ]; then
        echo "Sucesso: O orquestrador de microsservicos foi totalmente configurado e iniciado com sucesso!"
        exit 0
    else
        echo "Erro: Certifique-se de iniciar a stack usando 'docker compose up -d'."
        exit 1
    fi
fi
