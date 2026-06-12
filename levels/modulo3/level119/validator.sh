#!/bin/bash
set -euo pipefail

PID_FILE="/var/run/backup_dental.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "Erro: O ambiente do desafio nao foi inicializado corretamente."
    exit 1
fi

PID=$(cat "$PID_FILE" | tr -d '[:space:]')

# Verifica se o processo ainda esta rodando
if ! kill -0 "$PID" >/dev/null 2>&1; then
    echo "Erro: O processo backup_dental.sh (PID $PID) nao esta mais rodando."
    exit 1
fi

# Verifica o valor de nice do processo
NICE_VAL=$(ps -o nice= -p "$PID" | tr -d '[:space:]')

if [ "$NICE_VAL" != "19" ]; then
    echo "Erro: A prioridade (nice) do processo $PID e '$NICE_VAL', mas deveria ser '19'. Use o comando 'renice 19 -p $PID'."
    exit 1
fi

echo "Sucesso: Prioridade do processo $PID (backup_dental.sh) alterada para 19 com sucesso!"
exit 0
