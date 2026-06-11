#!/bin/bash
# validator.sh - Valida se as variáveis declaradas no script estão corretas.
set -euo pipefail

SCRIPT="/home/operator/info.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo info.sh não existe."
    exit 1
fi

# Executar script
OUTPUT=$("$SCRIPT" 2>/dev/null || true)

# Remover espaços em branco para comparação tolerante
CLEAN_OUTPUT=$(echo "$OUTPUT" | tr -d '[:space:]')
EXPECTED="IA:AURA-7-Integridade:95%"

if [ "$CLEAN_OUTPUT" != "$EXPECTED" ]; then
    echo "Falha: A saída gerada pelo script ('$OUTPUT') não corresponde à saída esperada."
    exit 1
fi

echo "Sucesso: Variáveis declaradas e referenciadas com maestria!"
exit 0
