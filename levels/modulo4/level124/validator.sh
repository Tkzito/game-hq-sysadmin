#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'traceroute 192.168.2.100'."
    exit 1
fi

# 2. Verifica se o comando de traceroute foi executado no destino correto
if grep -qEi "\b(traceroute|tracepath|mtr)\b.*\b192\.168\.2\.100\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando de rastreamento de rota para 192.168.2.100 foi executado com sucesso!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao de 'traceroute 192.168.2.100' ou 'tracepath 192.168.2.100' no seu historico."
    exit 1
fi
