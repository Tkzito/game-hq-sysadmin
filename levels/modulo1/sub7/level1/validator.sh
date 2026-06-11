#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/ler_linhas.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT")
EXPECTED=$(printf "Nome: AURA
Nome: Helena
Nome: Arthur")
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: O loop while read -r processou o arquivo corretamente!"
    exit 0
else
    echo "Falha: Saida incorreta: '$OUT'"
    exit 1
fi
