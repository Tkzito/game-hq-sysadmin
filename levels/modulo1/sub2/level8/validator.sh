#!/bin/bash
# validator.sh - Valida se o strict mode foi ativado e a variável destino foi definida.
set -euo pipefail

SCRIPT="/home/operator/sync.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo sync.sh não existe em /home/operator."
    exit 1
fi

# 1. Verificar se ativou strict mode
if ! grep -qE "set\s+-e" "$SCRIPT" && ! grep -qE "set\s+-euo\s+pipefail" "$SCRIPT" && ! grep -qE "set\s+-u" "$SCRIPT"; then
    echo "Falha: Você deve habilitar o modo de segurança (set -e e set -u ou set -euo pipefail)."
    exit 1
fi

if ! grep -qE "pipefail" "$SCRIPT"; then
    echo "Falha: Você deve habilitar o pipefail (set -o pipefail ou set -euo pipefail) no modo de segurança."
    exit 1
fi

# 2. Verificar se declarou a variável PASTA_DESTINO
if ! grep -q "PASTA_DESTINO=" "$SCRIPT"; then
    echo "Falha: A variável PASTA_DESTINO não foi declarada no script."
    exit 1
fi

# Executar o script
rm -rf /home/operator/destino
set +e
OUTPUT=$("$SCRIPT" 2>/dev/null)
STATUS=$?
set -e

if [ "$STATUS" -ne 0 ]; then
    echo "Falha: O script falhou ao rodar (status de saída: $STATUS). Verifique se declarou a pasta destino corretamente."
    exit 1
fi

if [ ! -f "/home/operator/destino/sync.txt" ]; then
    echo "Falha: O arquivo /home/operator/destino/sync.txt não foi gerado."
    exit 1
fi

echo "Sucesso: Strict Mode ativado e variáveis resolvidas perfeitamente!"
exit 0
