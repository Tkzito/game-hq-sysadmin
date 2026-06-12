#!/bin/bash
set -euo pipefail

# Verifica se a entrada existe no /etc/hosts
if ! grep -qE "192\.168\.2\.100[[:space:]]+filial-caruaru\.saoluis\.local" /etc/hosts; then
    echo "Erro: A entrada associando 192.168.2.100 a filial-caruaru.saoluis.local nao foi encontrada em /etc/hosts."
    exit 1
fi

echo "Sucesso: Voce adicionou corretamente o mapeamento estatico do DNS no arquivo /etc/hosts!"
exit 0
