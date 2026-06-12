#!/bin/bash
set -euo pipefail
if ! grep -q "ls -l" /home/operator/.bash_history && ! grep -q "ls -la" /home/operator/.bash_history; then
    echo "Falha: Você precisa listar as permissões detalhadamente usando 'ls -l' ou 'ls -la'."
    exit 1
fi
echo "Sucesso: Permissões de arquivos fiscais inspecionadas!"
exit 0
