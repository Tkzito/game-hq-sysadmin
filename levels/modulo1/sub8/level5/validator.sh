#!/bin/bash
# validator.sh - Nível 75
set -euo pipefail

HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$HISTORY_FILE" ]; then
    echo "Falha: Nenhum histórico de comandos encontrado."
    exit 1
fi

# Procurar o comando no histórico com redirecionamento de ambas as saídas para /dev/null
# Padrões comuns:
# ./sensor_noise.sh &> /dev/null
# ./sensor_noise.sh > /dev/null 2>&1
# /home/operator/sensor_noise.sh &> /dev/null
# /home/operator/sensor_noise.sh > /dev/null 2>&1
# e variações com espaçamento
if grep -qE "(sensor_noise\.sh.*>/dev/null.*2>&1|sensor_noise\.sh.*2>&1.*>/dev/null|sensor_noise\.sh.*&>/dev/null|sensor_noise\.sh.*>/dev/null\s+2>|sensor_noise\.sh.*>/dev/null\s+2>&-)" "$HISTORY_FILE"; then
    echo "Sucesso: O script sensor_noise.sh foi executado de forma silenciosa, descartando todas as saídas no buraco negro digital /dev/null!"
    exit 0
else
    echo "Falha: Você deve rodar o script sensor_noise.sh silenciando completamente tanto a saída normal quanto a de erro usando /dev/null."
    exit 1
fi
