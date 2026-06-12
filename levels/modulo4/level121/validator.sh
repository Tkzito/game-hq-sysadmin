#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'ip addr'."
    exit 1
fi

# 2. Verifica se o comando ip addr ou ip link foi executado
if grep -qEi "\bip\s+(a|addr|address|l|link)\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando ip foi executado e voce inspecionou as interfaces de rede!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'ip addr' ou similar no seu historico. Use-o para ver as interfaces."
    exit 1
fi
