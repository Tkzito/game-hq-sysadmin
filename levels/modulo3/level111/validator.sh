#!/bin/bash
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

# 1. Verifica se o histórico existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando foi registrado no histórico do terminal ainda. Use o comando 'ps aux' para inspecionar os processos ativos."
    exit 1
fi

# 2. Verifica se o processo simulado radiologia_sync esta rodando
if ! pgrep -f "radiologia_sync" >/dev/null; then
    echo "Erro: O processo simulado radiologia_sync nao esta rodando no sistema."
    exit 1
fi

# 3. Verifica se o comando ps aux ou ps -ef foi executado
if grep -qEi "ps\s+(aux|-ef|ax|auxww)" "$HISTORY_FILE"; then
    echo "Sucesso: Voce inspecionou corretamente os processos ativos usando o comando ps!"
    exit 0
else
    echo "Erro: Nao encontramos o comando 'ps aux' ou similar no seu historico. Use-o para inspecionar os processos ativos."
    exit 1
fi
