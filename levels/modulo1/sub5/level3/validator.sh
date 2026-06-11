#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/listar.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT" alfa beta gama)
EXPECTED=$(printf "Tarefa: alfa
Tarefa: beta
Tarefa: gama")
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: Todos os parâmetros foram iterados corretamente!"
    exit 0
else
    echo "Falha: Saida nao corresponde ao esperado."
    exit 1
fi
