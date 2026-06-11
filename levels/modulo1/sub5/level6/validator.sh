#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/usuario.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT" -n "Aura Seven" -a "99")
EXPECTED=$(printf "NOME=Aura Seven
IDADE=99")
if [ "$OUT" != "$EXPECTED" ]; then
    echo "Falha: Saida '$OUT' difere de '$EXPECTED'"
    exit 1
fi
set +e
ERR_OUT=$("$SCRIPT" -x 2>&1)
CODE=$?
set -e
if [ "$CODE" -ne 1 ]; then
    echo "Falha: Opcao invalida nao retornou exit code 1. Retornou: $CODE"
    exit 1
fi
echo "Sucesso: Getopts validado e rejeicao de chaves invalidas funcionando!"
exit 0
