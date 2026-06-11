#!/bin/bash
# validator.sh - Nível 74
set -euo pipefail

FILE="/home/operator/system.log"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo system.log não existe."
    exit 1
fi

if ! grep -q "SYS: Boot OK" "$FILE"; then
    echo "Falha: Você sobrescreveu o arquivo em vez de adicionar o conteúdo. Use '>>' em vez de '>'."
    exit 1
fi

if ! grep -q "SYS: Servico AURA online" "$FILE"; then
    echo "Falha: A linha 'SYS: Servico AURA online' não foi encontrada no arquivo system.log."
    exit 1
fi

# Verificar se usou redirecionamento de adição '>>' no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -E -q ">>.*system.log" "$HISTORY_FILE"; then
        echo "Falha: Não foi encontrado o comando de adição '>>' para system.log no histórico de comandos."
        exit 1
    fi
fi

echo "Sucesso: O status foi anexado corretamente no log sem sobrescrever os registros anteriores!"
exit 0
