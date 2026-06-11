#!/bin/bash
# validator.sh - Nível 73
set -euo pipefail

FILE="/home/operator/combined.log"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo combined.log não foi criado."
    exit 1
fi

if ! grep -q "Iniciando processo de backup" "$FILE"; then
    echo "Falha: O arquivo combined.log não contém a saída padrão (stdout)."
    exit 1
fi

if ! grep -q "ALERTA: Espaço em disco reduzido" "$FILE"; then
    echo "Falha: O arquivo combined.log não contém a saída de erro (stderr)."
    exit 1
fi

# Verificar se usou redirecionamento completo no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -E -q "(&>|>.*2>&1).*combined.log" "$HISTORY_FILE"; then
        echo "Falha: Não foi detectado redirecionamento combinado (e.g. &> ou 2>&1) no histórico de comandos."
        exit 1
    fi
fi

echo "Sucesso: O log combinado capturou tanto a saída padrão quanto a de erro com sucesso!"
exit 0
