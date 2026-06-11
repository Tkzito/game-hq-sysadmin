#!/bin/bash
# validator.sh - Verifica se o arquivo correto de texto foi medido.
set -euo pipefail

FILE="/home/operator/resultado_contagem.txt"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo resultado_contagem.txt não foi encontrado na home."
    exit 1
fi

CONTENT=$(cat "$FILE" | tr -d '[:space:]' | grep -oE "[0-9]+")

if [ -z "$CONTENT" ]; then
    echo "Falha: O arquivo resultado_contagem.txt está vazio ou sem formato numérico válido."
    exit 1
fi

if [ "$CONTENT" != "42" ]; then
    echo "Falha: A contagem de linhas informada ($CONTENT) está incorreta. Identifique o arquivo de texto correto e use wc -l."
    exit 1
fi

# Verificar se usou file e wc no histórico
HISTORY_FILE="/home/operator/.bash_history"
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -q "file" "$HISTORY_FILE"; then
        echo "Aviso: O comando 'file' é útil para determinar o tipo de arquivo."
    fi
    if ! grep -q "wc" "$HISTORY_FILE"; then
        echo "Aviso: O comando 'wc' é útil para contar linhas."
    fi
fi

echo "Sucesso: O arquivo de texto correto foi identificado e possui exatamente 42 linhas!"
exit 0
