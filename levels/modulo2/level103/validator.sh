#!/bin/bash
set -euo pipefail
PERM=$(stat -c "%a" /home/operator/medicamentos.db)
if [ "$PERM" != "600" ]; then
    echo "Falha: O arquivo medicamentos.db não está blindado (deve ter permissões 600)."
    exit 1
fi
echo "Sucesso: Banco de dados blindado!"
exit 0
