#!/bin/bash
# validator.sh - Nível 79
set -euo pipefail

FILE="/home/operator/top_erros.txt"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo top_erros.txt não foi encontrado."
    exit 1
fi

# Ler as linhas limpando espaços excessivos
LINE1=$(sed -n '1p' "$FILE" | xargs)
LINE2=$(sed -n '2p' "$FILE" | xargs)
LINE3=$(sed -n '3p' "$FILE" | xargs)

# Validar linha 1
if [[ ! "$LINE1" =~ ^10\ \[?ERROR\]?\ Database\ down ]]; then
    echo "Falha: O erro mais comum deve ser 'Database down' com 10 ocorrências. Encontrado: '$LINE1'"
    exit 1
fi

# Validar linha 2
if [[ ! "$LINE2" =~ ^8\ \[?ERROR\]?\ Timeout ]]; then
    echo "Falha: O segundo erro mais comum deve ser 'Timeout' com 8 ocorrências. Encontrado: '$LINE2'"
    exit 1
fi

# Validar linha 3
if [[ ! "$LINE3" =~ ^5\ \[?ERROR\]?\ Connection\ failed ]]; then
    echo "Falha: O terceiro erro mais comum deve ser 'Connection failed' com 5 ocorrências. Encontrado: '$LINE3'"
    exit 1
fi

# Verificar se usou a cadeia de pipes correta no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -q "grep" "$HISTORY_FILE" || ! grep -q "uniq" "$HISTORY_FILE" || ! grep -q "sort" "$HISTORY_FILE" || ! grep -q "head" "$HISTORY_FILE"; then
        echo "Falha: Você deve usar a cadeia de comandos contendo grep, sort, uniq -c, sort -nr e head no histórico."
        exit 1
    fi
fi

echo "Sucesso: O pipeline avançado identificou perfeitamente os top 3 erros mais frequentes!"
exit 0
