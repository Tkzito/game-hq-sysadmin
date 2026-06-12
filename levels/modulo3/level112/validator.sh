#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o htop esta instalado
if ! which htop >/dev/null 2>&1; then
    echo "Erro: O utilitario htop nao esta instalado no sistema. Instale-o usando apt-get."
    exit 1
fi

# 2. Verifica se o historico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no historico. Instale e execute o htop para monitorar os processos."
    exit 1
fi

# 3. Verifica se o comando htop foi executado
if grep -qEi "\bhtop\b" "$HISTORY_FILE"; then
    echo "Sucesso: O htop foi instalado e executado com sucesso!"
    exit 0
else
    echo "Erro: Nao encontramos a execucao do comando 'htop' no seu historico. Execute o htop para inspecionar os processos ativos."
    exit 1
fi
