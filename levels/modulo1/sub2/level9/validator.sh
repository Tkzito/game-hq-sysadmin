#!/bin/bash
# validator.sh - Valida se o comando read foi implementado corretamente.
set -euo pipefail

SCRIPT="/home/operator/confirmacao.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo confirmacao.sh não existe em /home/operator."
    exit 1
fi

if ! grep -q "read" "$SCRIPT"; then
    echo "Falha: Você deve utilizar o comando 'read' no script."
    exit 1
fi

# Simular input afirmativo 'S'
OUTPUT_S=$(echo "S" | "$SCRIPT" 2>/dev/null)
if [[ "$OUTPUT_S" != *"Inicializando AURA..."* ]]; then
    echo "Falha: O script não respondeu adequadamente à entrada afirmativa 'S'."
    exit 1
fi

# Simular input negativo 'N'
OUTPUT_N=$(echo "N" | "$SCRIPT" 2>/dev/null)
if [[ "$OUTPUT_N" != *"Operacao abortada"* ]]; then
    echo "Falha: O script não respondeu adequadamente à entrada negativa 'N'."
    exit 1
fi

echo "Sucesso: O script interativo com comando read funcionou corretamente!"
exit 0
