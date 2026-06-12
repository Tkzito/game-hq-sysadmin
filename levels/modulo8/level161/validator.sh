#!/bin/bash
set -euo pipefail

YAML_FILE="/home/operator/deployment.yaml"

if [ ! -f "$YAML_FILE" ]; then
    echo "Erro: O arquivo 'deployment.yaml' nao foi encontrado em /home/operator/"
    exit 1
fi

# Validate YAML structure
IS_DEPLOYMENT=$(python3 -c "
try:
    import yaml
    with open('$YAML_FILE') as f:
        data = yaml.safe_load(f)
    is_deploy = data.get('kind') == 'Deployment'
    has_replicas = 'replicas' in data.get('spec', {})
    has_image = any('image' in container for container in data.get('spec', {}).get('template', {}).get('spec', {}).get('containers', []))
    print('1' if (is_deploy and has_replicas and has_image) else '0')
except Exception as e:
    print('0')
")

if [ "$IS_DEPLOYMENT" = "1" ]; then
    echo "Sucesso: Manifesto de deployment YAML validado com sucesso!"
    exit 0
else
    # Grep/Python raw fallback in case pyyaml is missing or has error
    HAS_KIND=$(grep -E "kind:\s*Deployment" "$YAML_FILE" || true)
    HAS_REPLICAS=$(grep -E "replicas:\s*[0-9]+" "$YAML_FILE" || true)
    HAS_IMAGE=$(grep -E "image:\s*[a-zA-Z0-9_/:-]+" "$YAML_FILE" || true)
    if [ -n "$HAS_KIND" ] && [ -n "$HAS_REPLICAS" ] && [ -n "$HAS_IMAGE" ]; then
        echo "Sucesso: Manifesto de deployment YAML validado com sucesso! (Fallback)"
        exit 0
    else
        echo "Erro: O arquivo deployment.yaml nao parece ser um manifesto de Deployment Kubernetes valido ou esta faltando declaracao de replicas/imagem."
        exit 1
    fi
fi
