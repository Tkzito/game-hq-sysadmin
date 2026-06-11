#!/bin/bash
# validator.sh - Nível 77
set -euo pipefail

FILE="/home/operator/ips_unicos.txt"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo ips_unicos.txt não foi encontrado."
    exit 1
fi

# Comparar o arquivo gerado com o resultado esperado ordenado e único
EXPECTED=$(cat << 'EOF'
10.0.0.5
172.16.0.2
192.168.1.10
192.168.1.50
EOF
)

ACTUAL=$(cat "$FILE" | xargs)

if [ "$ACTUAL" != "$(echo "$EXPECTED" | xargs)" ]; then
    echo "Falha: O conteúdo de ips_unicos.txt está incorreto. Ele deve ser ordenado e conter apenas IPs únicos."
    exit 1
fi

# Verificar uso de sort e uniq no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -q "sort" "$HISTORY_FILE" || ! grep -q "uniq" "$HISTORY_FILE"; then
        echo "Falha: Não foram encontrados os comandos 'sort' e 'uniq' encadeados no histórico de comandos."
        exit 1
    fi
fi

echo "Sucesso: A lista de endereços IP foi filtrada de forma única e ordenada!"
exit 0
