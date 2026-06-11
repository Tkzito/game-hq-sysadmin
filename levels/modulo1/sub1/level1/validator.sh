#!/bin/bash
# validator.sh - Verifica se o jogador executou o comando echo correspondente.
# Foco: Validação através da inspeção do histórico de comandos (.bash_history).
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$HISTORY_FILE" ]; then
    echo "Erro: Nenhum comando executado no terminal ainda."
    exit 1
fi

# Procurar se no histórico existe o comando echo correspondente
if grep -qEi "echo\s+[\"']Olá,\s*AURA[\"']" "$HISTORY_FILE"; then
    echo "Sucesso: O sinal de vida 'Olá, AURA' foi detectado e AURA-7 respondeu!"
    exit 0
else
    echo "Falha: O comando 'echo' com a frase correta não foi localizado no histórico."
    exit 1
fi
