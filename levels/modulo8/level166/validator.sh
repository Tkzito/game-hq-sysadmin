#!/bin/bash
set -euo pipefail

YAML_FILE="/home/operator/deployment.yaml"
STATE_FILE="/home/operator/.cluster_state.json"

if [ ! -f "$YAML_FILE" ]; then
    echo "Erro: O arquivo 'deployment.yaml' nao foi encontrado em /home/operator/"
    exit 1
fi

if [ ! -f "$STATE_FILE" ]; then
    echo "Erro: O cluster nao foi inicializado."
    exit 1
fi

# Verify probes configuration in YAML
HAS_PROBES=$(python3 -c "
try:
    import yaml
    with open('$YAML_FILE') as f:
        data = yaml.safe_load(f)
    container = data.get('spec', {}).get('template', {}).get('spec', {}).get('containers', [])[0]
    has_liveness = 'livenessProbe' in container
    has_readiness = 'readinessProbe' in container
    print('1' if (has_liveness and has_readiness) else '0')
except Exception as e:
    print('0')
")

if [ "$HAS_PROBES" = "0" ]; then
    # Fallback to grep in case python yaml library is missing or has error
    if grep -q "livenessProbe" "$YAML_FILE" && grep -q "readinessProbe" "$YAML_FILE"; then
        HAS_PROBES="1"
    fi
fi

# Verify if cluster is healthy (no CrashLoopBackOff)
IS_HEALTHY=$(python3 -c "
import json
try:
    with open('$STATE_FILE') as f:
        data = json.load(f)
    pods = data.get('pods', [])
    crashed = any(p['status'] == 'CrashLoopBackOff' for p in pods)
    print('1' if (not crashed and len(pods) > 0) else '0')
except Exception as e:
    print('0')
")

if [ "$HAS_PROBES" = "1" ] && [ "$IS_HEALTHY" = "1" ]; then
    echo "Sucesso: Liveness e Readiness probes configurados e reconciliados com sucesso!"
    exit 0
else
    echo "Erro: As livenessProbe e readinessProbe devem ser adicionadas ao container no deployment.yaml e aplicadas via 'clusterctl apply -f deployment.yaml'."
    exit 1
fi
