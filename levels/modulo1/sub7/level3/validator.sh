#!/bin/bash
set -euo pipefail
FILE="/home/operator/db.conf"
if [ ! -f "$FILE" ]; then
    echo "Erro: Arquivo nao existe."
    exit 1
fi
if grep -q "PORT=3307" "$FILE" && ! grep -q "PORT=3306" "$FILE"; then
    echo "Sucesso: Alteracao in-place com sed efetuada com sucesso!"
    exit 0
else
    echo "Falha: O arquivo ainda contem PORT=3306 ou nao foi alterado para PORT=3307."
    exit 1
fi
