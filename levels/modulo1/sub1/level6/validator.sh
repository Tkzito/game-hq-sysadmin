#!/bin/bash
# validator.sh - Verifica se o jogador mediu corretamente o arquivo.
set -euo pipefail

FILE="/home/operator/bytes.txt"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo bytes.txt não foi criado em /home/operator."
    exit 1
fi

# Extrair apenas o número do arquivo
CONTENT=$(cat "$FILE" | tr -d '[:space:]' | grep -oE "[0-9]+")

if [ -z "$CONTENT" ]; then
    echo "Falha: O arquivo bytes.txt está vazio ou não possui números."
    exit 1
fi

if [ "$CONTENT" != "23" ]; then
    echo "Falha: O número de bytes indicado ($CONTENT) está incorreto. Esperado: 23."
    exit 1
fi

# Verificar se usou o comando wc no histórico
HISTORY_FILE="/home/operator/.bash_history"
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -q "wc" "$HISTORY_FILE"; then
        echo "Aviso: Tente utilizar o comando 'wc' com a flag de contagem de bytes/caracteres."
    fi
fi

echo "Sucesso: Tamanho do arquivo de rede medido com precisão!"
exit 0
