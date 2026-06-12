#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico do terminal ainda. Tente usar 'free -h'."
    exit 1
fi

# 2. Verifica se o comando free foi executado
if grep -qEi "\bfree\b" "$HISTORY_FILE"; then
    echo "Sucesso: Voce inspecionou corretamente a memoria RAM e Swap utilizando o comando free!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'free' no seu historico. Use-o para diagnosticar o consumo de RAM e Swap."
    exit 1
fi
