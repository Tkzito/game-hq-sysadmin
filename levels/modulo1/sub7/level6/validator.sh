#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/obter_db.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
OUT=$("$SCRIPT" | grep -v "^$" | tr -d ' 	')
EXPECTED=$(printf "db_host=db.local
db_port=5432" | tr -d ' 	')
if [ "$OUT" = "$EXPECTED" ]; then
    echo "Sucesso: Parsing de arquivo INI por secoes validado!"
    exit 0
else
    echo "Falha: Saida recebida: '$OUT'"
    exit 1
fi
