#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/contar.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: Script contar.sh nao e executavel."
    exit 1
fi
# Testar com 2 args (deve falhar com exit code 1)
set +e
OUT1=$("$SCRIPT" arg1 arg2)
CODE1=$?
set -e
if [ "$CODE1" -ne 1 ] || [ "$OUT1" != "ERRO: Minimo de 3 argumentos necessarios." ]; then
    echo "Falha: Com 2 argumentos deveria retornar exit 1 e mensagem de erro, recebeu exit $CODE1 e: $OUT1"
    exit 1
fi
# Testar com 4 args (deve passar com exit code 0)
OUT2=$("$SCRIPT" a b c d)
if [ "$OUT2" != "OK: 4 argumentos recebidos." ]; then
    echo "Falha: Com 4 argumentos recebeu '$OUT2'"
    exit 1
fi
echo "Sucesso: A contagem e validacao de argumentos estao funcionando perfeitamente!"
exit 0
