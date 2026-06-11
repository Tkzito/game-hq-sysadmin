#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/principal.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT")
if [ "$OUT" = "SISTEMA OPERACIONAL TOTALMENTE OPERACIONAL" ]; then
    echo "Sucesso: Biblioteca carregada via source e funcao executada!"
    exit 0
else
    echo "Falha: A funcao nao produziu a saida correta ou nao foi chamada: '$OUT'"
    exit 1
fi
