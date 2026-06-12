#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'df -h'."
    exit 1
fi

# 2. Verifica se o comando df foi executado
if grep -qEi "\bdf\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando df foi executado com sucesso e voce identificou as particoes do sistema!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'df' no seu historico. Use-o para analisar o uso de disco por particao."
    exit 1
fi
