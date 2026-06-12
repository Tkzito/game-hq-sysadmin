#!/bin/bash
set -euo pipefail
GROUP=$(stat -c "%G" /home/operator/planilha.xlsx)
PERM=$(stat -c "%a" /home/operator/planilha.xlsx)
if [ "$GROUP" != "financeiro" ]; then
    echo "Falha: O grupo do arquivo planilha.xlsx deve ser financeiro."
    exit 1
fi
if [ "$PERM" != "660" ]; then
    echo "Falha: As permissões do arquivo planilha.xlsx devem ser 660."
    exit 1
fi
echo "Sucesso: Grupo financeiro configurado no arquivo!"
exit 0
