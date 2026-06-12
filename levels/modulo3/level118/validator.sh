#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'lsof -p PID'."
    exit 1
fi

# 2. Verifica se o comando lsof foi executado
if grep -qEi "\blsof\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando lsof foi executado e voce rastreou os arquivos abertos pelo processo!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'lsof' no seu historico. Use-o para inspecionar os arquivos do processo."
    exit 1
fi
