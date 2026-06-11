#!/bin/bash
# validator.sh - Verifica se o jogador encontrou o arquivo oculto e extraiu a chave correta.
set -euo pipefail

FILE="/home/operator/chave_ativacao.txt"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo chave_ativacao.txt não foi criado em /home/operator."
    exit 1
fi

CONTENT=$(cat "$FILE" | tr -d '[:space:]')

if [ "$CONTENT" != "CHAVE-SOLAR-9982" ]; then
    echo "Falha: O conteúdo do arquivo chave_ativacao.txt não corresponde à chave correta."
    exit 1
fi

echo "Sucesso: Você desvendou o arquivo oculto e ativou os geradores solares!"
exit 0
