#!/bin/bash
set -euo pipefail

YAML_FILE="/home/operator/deployment.yaml"

if [ ! -f "$YAML_FILE" ]; then
    echo "Erro: O arquivo 'deployment.yaml' nao foi encontrado em /home/operator/"
    exit 1
fi

# Verify if replicas: 5 is in the YAML
REPLICAS=$(python3 -c "
try:
    import yaml
    with open('$YAML_FILE') as f:
        data = yaml.safe_load(f)
    replicas = data.get('spec', {}).get('replicas', 0)
    print(replicas)
except Exception as e:
    print('0')
")

if [ "$REPLICAS" = "5" ]; then
    echo "Sucesso: Replica count escalada para 5 com sucesso!"
    exit 0
else
    # Grep fallback in case python yaml library is missing or crashed
    if grep -qE "replicas:\s*5" "$YAML_FILE"; then
        echo "Sucesso: Replica count escalada para 5 com sucesso! (Fallback)"
        exit 0
    else
        echo "Erro: O numero de replicas no manifesto deployment.yaml deve ser alterado para exatamente 5 (atualmente e $REPLICAS)."
        exit 1
    fi
fi
