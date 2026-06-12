#!/bin/bash
set -euo pipefail
if [ ! -x "/home/operator/fechar_caixa.sh" ]; then
    echo "Falha: O script fechar_caixa.sh ainda não possui permissão de execução."
    exit 1
fi
echo "Sucesso: Script de fechamento do caixa destravado!"
exit 0
