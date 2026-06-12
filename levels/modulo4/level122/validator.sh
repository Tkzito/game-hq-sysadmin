#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'ip route'."
    exit 1
fi

# 2. Verifica se o comando ip route foi executado
if grep -qEi "\bip\s+(r|route)\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando 'ip route' foi executado e voce analisou a tabela de rotas do sistema!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'ip route' no seu historico. Use-o para inspecionar a tabela de rotas."
    exit 1
fi
