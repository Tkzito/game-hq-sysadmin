#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/seguro.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
# Testar se set -u esta ativo no script (inspeção de texto)
if ! grep -q "set -u" "$SCRIPT" && ! grep -q "set -eu" "$SCRIPT"; then
    echo "Falha: O script nao contem o comando 'set -u' ou 'set -eu'."
    exit 1
fi
# Executar e verificar se aborta
set +e
OUT=$(NOME_DE_TESTE="AURA" /bin/bash "$SCRIPT" 2>&1)
CODE=$?
set -e
if [ "$CODE" -eq 0 ]; then
    echo "Falha: O script nao abortou. Ele saiu com status 0."
    exit 1
fi
echo "Sucesso: Protecao set -u validada no script!"
exit 0
