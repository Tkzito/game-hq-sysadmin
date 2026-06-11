#!/bin/bash
# validator.sh - Nível 71
set -euo pipefail

FILE="/home/operator/output.log"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo output.log não foi criado em /home/operator/"
    exit 1
fi

if ! grep -q "=== RELATÓRIO DO MÓDULO ANOMALO DE ENERGIA ===" "$FILE"; then
    echo "Falha: O conteúdo de output.log está incorreto ou vazio."
    exit 1
fi

if ! grep -q "Status: ESTÁVEL" "$FILE"; then
    echo "Falha: O conteúdo de output.log está incorreto."
    exit 1
fi

# Verificar se usou redirecionamento '>' no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -E -q ">.*output.log" "$HISTORY_FILE"; then
        echo "Falha: Não foi encontrado o comando de redirecionamento '>' para output.log no histórico de comandos."
        exit 1
    fi
fi

echo "Sucesso: O relatório foi gerado e redirecionado com sucesso para output.log!"
exit 0
