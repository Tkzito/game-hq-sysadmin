#!/bin/bash
# validator.sh - Nível 76
set -euo pipefail

FILE="/home/operator/erros_filtrados.txt"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo erros_filtrados.txt não foi encontrado."
    exit 1
fi

# Verificar se contém as linhas de erro corretas
if ! grep -q "Conexão recusada" "$FILE" || ! grep -q "Timeout ao tentar" "$FILE" || ! grep -q "Falha crítica" "$FILE"; then
    echo "Falha: O arquivo erros_filtrados.txt está sem alguns erros esperados."
    exit 1
fi

# Verificar se não possui INFO ou WARNING
if grep -q "INFO" "$FILE" || grep -q "WARNING" "$FILE"; then
    echo "Falha: O arquivo erros_filtrados.txt contém linhas que não são de erro (INFO ou WARNING)."
    exit 1
fi

# Verificar uso de pipe no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -E -q "\|.*grep" "$HISTORY_FILE"; then
        echo "Falha: Não foi encontrado o uso de pipe '|' com grep no histórico de comandos."
        exit 1
    fi
fi

echo "Sucesso: As linhas de erro foram filtradas e salvas com sucesso!"
exit 0
