#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/array_monitor.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não é executável."
    exit 1
fi

CONTENT=$(cat "$SCRIPT_PATH")
# Verificar se usa array associativo
if [[ ! "$CONTENT" =~ "declare -A" ]]; then
    echo "Erro: O script deve utilizar um array associativo (declare -A)."
    exit 1
fi

# Executar o script do usuário e checar o mapeamento
OUTPUT=$("$SCRIPT_PATH" 2>&1)
if [[ ! "$OUTPUT" =~ "8080" ]] || [[ ! "$OUTPUT" =~ "5432" ]]; then
    echo "Erro: A saída do script não contém os dados corretos mapeados no array associativo (portas 8080 e 5432)."
    exit 1
fi

echo "Sucesso: O script de arrays indexados e associativos foi validado!"
exit 0
