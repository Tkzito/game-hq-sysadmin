#!/bin/bash
# validator.sh - Valida se as variáveis de ambiente corretas foram mapeadas.
set -euo pipefail

SCRIPT="/home/operator/ambiente.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo ambiente.sh não existe."
    exit 1
fi

OUTPUT=$("$SCRIPT" 2>/dev/null || true)
CLEAN_OUTPUT=$(echo "$OUTPUT" | tr -d '[:space:]')
EXPECTED="Usuario:operator-Home:/home/operator"

if [ "$CLEAN_OUTPUT" != "$EXPECTED" ]; then
    echo "Falha: O script ambiente.sh não retornou o resultado esperado. Saída atual: '$OUTPUT'"
    exit 1
fi

echo "Sucesso: Variáveis de ambiente USER e HOME integradas com sucesso!"
exit 0
