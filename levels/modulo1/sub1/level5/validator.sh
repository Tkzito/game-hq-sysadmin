#!/bin/bash
# validator.sh - Verifica se o jogador encontrou o código de erro no log.
set -euo pipefail

FILE="/home/operator/codigo_erro.txt"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo codigo_erro.txt não foi criado em /home/operator."
    exit 1
fi

CONTENT=$(cat "$FILE" | tr -d '[:space:]')

if [ "$CONTENT" != "ERR-AUDIO-909" ]; then
    echo "Falha: O conteúdo do arquivo codigo_erro.txt não é a chave de erro correta."
    exit 1
fi

echo "Sucesso: Código de erro ERR-AUDIO-909 localizado e catalogado no sistema!"
exit 0
