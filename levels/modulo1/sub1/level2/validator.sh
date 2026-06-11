#!/bin/bash
# validator.sh - Verifica se o jogador executou o pwd e navegou para o diretório de estudos.
# Foco: Validação da navegação de diretórios via histórico e localização atual.
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando de navegação detectado no histórico."
    exit 1
fi

# 1. Verificar se o jogador usou o comando 'pwd'
if ! grep -qE "pwd" "$HISTORY_FILE"; then
    echo "Falha: Você precisa interrogar a localização do terminal usando o comando 'pwd'."
    exit 1
fi

# 2. Verificar se o jogador usou o comando 'cd' para navegar
if ! grep -qE "cd\s+(\~|estudos|/home/operator/estudos)" "$HISTORY_FILE"; then
    echo "Falha: O comando 'cd estudos' não foi executado para alterar o diretório."
    exit 1
fi

echo "Sucesso: Localização e navegação de diretórios executadas perfeitamente!"
exit 0
