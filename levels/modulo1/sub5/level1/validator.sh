#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/saudacao.sh"
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O script $SCRIPT nao existe."
    exit 1
fi
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: O script nao e executavel."
    exit 1
fi
# Testar com valor aleatorio
RAND_NAME="RoboTemp$(date +%s)"
OUTPUT=$("$SCRIPT" "$RAND_NAME")
EXPECTED="Olá, $RAND_NAME!"
if [ "$OUTPUT" = "$EXPECTED" ]; then
    echo "Sucesso: O script processou corretamente o argumento!"
    exit 0
else
    echo "Falha: Esperado '$EXPECTED', mas recebeu '$OUTPUT'."
    exit 1
fi
