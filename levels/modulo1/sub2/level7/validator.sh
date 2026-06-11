#!/bin/bash
# validator.sh - Valida se o script gerencia corretamente o código de saída do cp.
set -euo pipefail

SCRIPT="/home/operator/backup_db.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo backup_db.sh não existe."
    exit 1
fi

# 1. Testar falha (sem o banco_original.db)
rm -f /home/operator/banco_original.db /home/operator/db.backup
set +e
"$SCRIPT" >/dev/null 2>&1
STATUS_FALHA=$?
set -e

if [ "$STATUS_FALHA" -eq 0 ]; then
    echo "Falha: Quando o arquivo original não existe, o script retornou status 0 (sucesso). Deveria retornar um status de erro (ex: exit 1)."
    exit 1
fi

# 2. Testar sucesso (com banco_original.db)
echo "dados_mock_db" > /home/operator/banco_original.db
set +e
OUTPUT_SUCESSO=$("$SCRIPT" 2>/dev/null)
STATUS_SUCESSO=$?
set -e

if [ "$STATUS_SUCESSO" -ne 0 ]; then
    echo "Falha: Quando o arquivo original existe, o script retornou status de erro ($STATUS_SUCESSO) em vez de 0."
    exit 1
fi

if [[ "$OUTPUT_SUCESSO" != *"Backup concluido"* ]]; then
    echo "Falha: O script não imprimiu 'Backup concluido' ao obter sucesso."
    exit 1
fi

echo "Sucesso: O script gerencia perfeitamente o código de retorno usando \$?!"
exit 0
