#!/bin/bash
set -euo pipefail

YAML_FILE="/home/operator/api/deploy.yml"

if [ ! -f "$YAML_FILE" ]; then
    echo "Erro: O arquivo de deploy '$YAML_FILE' não foi encontrado."
    exit 1
fi

# Validar sintaxe usando python3 yaml parser
if ! python3 -c "import yaml; yaml.safe_load(open('$YAML_FILE'))" >/dev/null 2>&1; then
    echo "Erro: O arquivo deploy.yml ainda possui erros de sintaxe YAML."
    exit 1
fi

echo "Sucesso: O arquivo deploy.yml está sintaticamente correto!"
exit 0
