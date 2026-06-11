#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/backup_pastas.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT" "Nave Central" "Setor H" "Core 01 Temp")
EXPECTED=$(printf "Processando pasta: Nave Central
Processando pasta: Setor H
Processando pasta: Core 01 Temp")
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: Argumentos com espacos foram tratados perfeitamente com "\$@"!"
    exit 0
else
    echo "Falha: Saida incorreta ao lidar com espacos: '$OUT'"
    exit 1
fi
