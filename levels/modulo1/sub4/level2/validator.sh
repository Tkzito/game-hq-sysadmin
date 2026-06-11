#!/bin/bash
# validator.sh - Nível 32
set -euo pipefail

SCRIPT="/home/operator/sync.sh"

# 1. Verificar se o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não existe."
    exit 1
fi

# 2. Executar o script e capturar a saída
output=$(bash "$SCRIPT" 2>&1)

# 3. Validar se a mensagem de sucesso foi emitida
if ! echo "$output" | grep -q "Status de conexão OK. Sincronizando logs..."; then
    echo "Erro: O script ainda falha ou emite a mensagem de erro. Verifique a lógica de comparação do CONN_STATUS."
    exit 1
fi

echo "Parabéns! Você utilizou execução passo a passo para mapear e corrigir a lógica condicional invertida!"
exit 0
