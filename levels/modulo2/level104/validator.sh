#!/bin/bash
set -euo pipefail
OWNER=$(stat -c "%U:%G" /home/operator/farmacia)
OWNER_LOG=$(stat -c "%U:%G" /home/operator/farmacia/logs/fisc.log)
if [ "$OWNER" != "gerente:gerente" ] || [ "$OWNER_LOG" != "gerente:gerente" ]; then
    echo "Falha: A pasta farmacia (ou seus arquivos internos) não pertence ao gerente:gerente."
    exit 1
fi
echo "Sucesso: Propriedade dos arquivos transferida!"
exit 0
