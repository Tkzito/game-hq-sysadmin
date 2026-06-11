#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/config_flags.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT" -v -f /tmp/test.txt)
EXPECTED=$(printf "MODO_VERBOSO=ATIVO
ARQUIVO=/tmp/test.txt")
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: Getopts processou flags simples e argumentos opcionais!"
    exit 0
else
    echo "Falha: Saida inesperada: '$OUT'"
    exit 1
fi
