#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/check_disks.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não tem permissão de execução (use chmod +x)."
    exit 1
fi

CONTENT=$(cat "$SCRIPT_PATH")
if [[ ! "$CONTENT" =~ "for " ]]; then
    echo "Erro: O script não parece utilizar um loop 'for'."
    exit 1
fi

if [[ ! "$CONTENT" =~ "app01" ]] || [[ ! "$CONTENT" =~ "app02" ]] || [[ ! "$CONTENT" =~ "app03" ]]; then
    echo "Erro: O script deve iterar sobre os servidores 'app01', 'app02' e 'app03'."
    exit 1
fi

# Executar o script e capturar a saída
OUTPUT=$("$SCRIPT_PATH" 2>&1)
if [[ ! "$OUTPUT" =~ "app01" ]] || [[ ! "$OUTPUT" =~ "app02" ]] || [[ ! "$OUTPUT" =~ "app03" ]]; then
    echo "Erro: O script não produziu saída indicando que passou pelos 3 servidores."
    exit 1
fi

echo "Sucesso: O script de loop em lista estática foi criado e executa com sucesso!"
exit 0
