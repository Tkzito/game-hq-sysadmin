#!/bin/bash
# validator.sh - Nível 72
set -euo pipefail

FILE="/home/operator/errors.log"
HISTORY_FILE="/home/operator/.bash_history"

if [ ! -f "$FILE" ]; then
    echo "Falha: O arquivo errors.log não foi encontrado na home."
    exit 1
fi

if ! grep -q "ALERTA: Gateway 10.0.0.1 offline ou inacessível" "$FILE"; then
    echo "Falha: O conteúdo de errors.log não contém a mensagem de erro esperada."
    exit 1
fi

if grep -q "Pingando gateway principal..." "$FILE"; then
    echo "Falha: O arquivo errors.log contém saída padrão (stdout). Você deve redirecionar apenas a saída de erro (stderr)."
    exit 1
fi

# Verificar se usou redirecionamento '2>' no histórico
if [ -f "$HISTORY_FILE" ]; then
    if ! grep -E -q "2>.*errors.log" "$HISTORY_FILE"; then
        echo "Falha: Não foi encontrado o comando de redirecionamento de erro '2>' no histórico para errors.log."
        exit 1
    fi
fi

echo "Sucesso: O canal de erros foi redirecionado com sucesso para errors.log!"
exit 0
