#!/bin/bash
set -euo pipefail

RULES_FILE="/home/operator/.ufw_rules"
STATE_FILE="/home/operator/.cluster_state.json"
YAML_FILE="/home/operator/deployment.yaml"

# 1. Check DDoS mitigation
if [ ! -f "$RULES_FILE" ]; then
    echo "Erro: O firewall nao foi configurado."
    exit 1
fi
IS_BLOCKED=$(grep -F "198.51.100.72" "$RULES_FILE" || true)
if [ -z "$IS_BLOCKED" ]; then
    echo "Erro: O IP do DDoS (198.51.100.72) nao foi bloqueado no firewall (UFW)."
    exit 1
fi

# 2. Check cluster state
if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O cluster nao foi inicializado."
    exit 1
fi

HAS_NODE2=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    exists = any(n['name'] == 'eco-node-2' for n in data.get('nodes', []))
    print('1' if exists else '0')
except Exception as e:
    print('1')
")

if [ "$HAS_NODE2" = "1" ]; then
    echo "Erro: O nó caido eco-node-2 ainda esta ativo no cluster. Isole-o deletando-o do orquestrador."
    exit 1
fi

# 3. Check deployment config
if [ ! -f "$YAML_FILE" ]; then
    echo "Erro: O arquivo 'deployment.yaml' nao foi encontrado em /home/operator/"
    exit 1
fi

VALID_DEPLOY=$(python3 -c "
try:
    import yaml
    with open('$YAML_FILE') as f:
        data = yaml.safe_load(f)
        
    replicas = data.get('spec', {}).get('replicas', 0)
    container = data.get('spec', {}).get('template', {}).get('spec', {}).get('containers', [])[0]
    
    has_liveness = 'livenessProbe' in container
    has_readiness = 'readinessProbe' in container
    has_mem_limit = 'resources' in container and 'limits' in container['resources'] and 'memory' in container['resources']['limits']
    
    if replicas == 5 and has_liveness and has_readiness and has_mem_limit:
        print('1')
    else:
        print('0')
except Exception as e:
    print('0')
")

if [ "$VALID_DEPLOY" = "0" ]; then
    # Fallback checking without pyyaml
    HAS_REPLICAS=$(grep -qE "replicas:\s*5" "$YAML_FILE" && echo "1" || echo "0")
    HAS_LIVENESS=$(grep -q "livenessProbe" "$YAML_FILE" && echo "1" || echo "0")
    HAS_READINESS=$(grep -q "readinessProbe" "$YAML_FILE" && echo "1" || echo "0")
    HAS_RESOURCES=$(grep -q "resources" "$YAML_FILE" && echo "1" || echo "0")
    HAS_LIMITS=$(grep -q "limits" "$YAML_FILE" && echo "1" || echo "0")
    HAS_MEMORY=$(grep -q "memory" "$YAML_FILE" && echo "1" || echo "0")
    
    if [ "$HAS_REPLICAS" = "1" ] && [ "$HAS_LIVENESS" = "1" ] && [ "$HAS_READINESS" = "1" ] && [ "$HAS_RESOURCES" = "1" ] && [ "$HAS_LIMITS" = "1" ] && [ "$HAS_MEMORY" = "1" ]; then
        VALID_DEPLOY="1"
    else
        echo "Erro: O arquivo deployment.yaml nao contem as configuracoes corretas: 5 replicas, livenessProbe, readinessProbe e limits de memoria (RAM)."
        exit 1
    fi
fi

# 4. Check if reconciled pods exist and are healthy
PODS_HEALTHY=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    pods = data.get('pods', [])
    crashed = any(p['status'] == 'CrashLoopBackOff' for p in pods)
    print('1' if (not crashed and len(pods) == 5) else '0')
except Exception as e:
    print('0')
")

if [ "$PODS_HEALTHY" = "1" ]; then
    echo "Sucesso: Todos os sistemas restabelecidos e estáveis! O DDoS foi mitigado, o nó eco-node-2 foi isolado e o cluster foi reconciliado em alta disponibilidade com limites de recursos configurados."
    exit 0
else
    echo "Erro: Os pods do cluster ainda nao estao saudaveis ou nao estao na quantidade correta (5). Certifique-se de aplicar o manifesto modificado."
    exit 1
fi
