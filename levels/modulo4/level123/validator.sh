#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'ping 192.168.2.100'."
    exit 1
fi

# 2. Verifica se o comando ping foi executado no destino correto
if grep -qEi "\bping\b.*\b192\.168\.2\.100\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando ping para o destino 192.168.2.100 foi executado com sucesso!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'ping 192.168.2.100' no seu historico. Use-o para testar a conectividade."
    exit 1
fi
