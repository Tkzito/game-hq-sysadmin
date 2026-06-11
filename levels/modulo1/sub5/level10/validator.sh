#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/backup_tool.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
# Teste correto
OUT1=$("$SCRIPT" -d /home -t zip -v)
EXPECTED1=$(printf "DIR=/home
TIPO=zip
VERBOSO=SIM")
if [ "$OUT1" != "$EXPECTED1" ]; then
    echo "Falha teste correto: '$OUT1'"
    exit 1
fi
# Teste invalido (sem -d)
set +e
OUT2=$("$SCRIPT" -t zip 2>&1)
CODE2=$?
OUT3=$("$SCRIPT" -d /home -t tar 2>&1)
CODE3=$?
set -e
if [ "$CODE2" -ne 1 ] || [ "$OUT2" != "Erro na configuracao." ]; then
    echo "Falha ao validar -d ausente: '$OUT2' (exit $CODE2)"
    exit 1
fi
if [ "$CODE3" -ne 1 ] || [ "$OUT3" != "Erro na configuracao." ]; then
    echo "Falha ao validar tipo invalido 'tar': '$OUT3' (exit $CODE3)"
    exit 1
fi
echo "Sucesso: O backup_tool processa, valida e orquestra argumentos com maestria!"
exit 0
