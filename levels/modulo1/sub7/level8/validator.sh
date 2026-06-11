#!/bin/bash
set -euo pipefail
FILE="/home/operator/hosts.txt"
BAK="/home/operator/hosts.txt.bak"
if [ ! -f "$FILE" ] || [ ! -f "$BAK" ]; then
    echo "Erro: Arquivos hosts.txt ou hosts.txt.bak ausentes."
    exit 1
fi
if grep -q "127.0.0.1 loopback" "$FILE" && grep -q "127.0.0.1 localhost" "$BAK"; then
    echo "Sucesso: Substituicao realizada e backup gerado corretamente!"
    exit 0
else
    echo "Falha: O backup nao corresponde ao original ou a substituicao nao foi feita."
    exit 1
fi
