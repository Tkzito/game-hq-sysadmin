#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/shift_test.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT" delete logs temp cache)
EXPECTED=$(printf "Acao: delete
Alvos: logs temp cache")
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: Shift executado e argumentos restantes formatados!"
    exit 0
else
    echo "Falha: Recebeu '$OUT'"
    exit 1
fi
