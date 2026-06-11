#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/parser.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT")
EXPECTED=$(printf "Chave: PORT | Valor: 8080
Chave: HOST | Valor: 127.0.0.1
Chave: DB_USER | Valor: root")
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: O parser chave-valor funcionou perfeitamente!"
    exit 0
else
    echo "Falha: Saida do parser foi diferente do esperado: '$OUT'"
    exit 1
fi
