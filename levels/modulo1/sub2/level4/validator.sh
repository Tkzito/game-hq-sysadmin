#!/bin/bash
# validator.sh - Valida se as aspas simples foram substituídas por aspas duplas.
set -euo pipefail

SCRIPT="/home/operator/mensagem.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo mensagem.sh não existe."
    exit 1
fi

OUTPUT=$("$SCRIPT" 2>/dev/null || true)
CLEAN_OUTPUT=$(echo "$OUTPUT" | tr -d '[:space:]')
EXPECTED="AURASTATUS:ESTÁVEL"

if [ "$CLEAN_OUTPUT" != "$EXPECTED" ]; then
    echo "Falha: A variável STATUS não está sendo interpolada corretamente. Saída atual: '$OUTPUT'"
    exit 1
fi

# Verificar se ainda há aspas simples na linha do echo
if grep -q "echo 'AURA STATUS:" "$SCRIPT"; then
    echo "Falha: Você conseguiu a saída, mas ainda está usando aspas simples de alguma forma?"
    exit 1
fi

echo "Sucesso: Diferença entre aspas simples e duplas compreendida perfeitamente!"
exit 0
