#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'du -ah /var/log'."
    exit 1
fi

# 2. Verifica se o comando du foi executado
if grep -qEi "\bdu\b" "$HISTORY_FILE"; then
    echo "Sucesso: O comando du foi executado e voce analisou a ocupacao do espaco em disco!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'du' no seu historico. Use-o para identificar o maior arquivo."
    exit 1
fi
