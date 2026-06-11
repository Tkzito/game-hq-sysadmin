#!/bin/bash
# validator.sh - Valida todos os itens do script de deploy do jogador.
set -euo pipefail

SCRIPT="/home/operator/deploy.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo deploy.sh não existe em /home/operator."
    exit 1
fi

# 1. Verificar Shebang
FIRST_LINE=$(head -n 1 "$SCRIPT")
if [ "$FIRST_LINE" != "#!/bin/bash" ] && [ "$FIRST_LINE" != "#!/usr/bin/env bash" ]; then
    echo "Falha: A Shebang correta do bash (#!/bin/bash) não foi configurada na linha 1."
    exit 1
fi

# 2. Verificar strict mode
if ! grep -qE "set\s+-e" "$SCRIPT" && ! grep -qE "set\s+-euo\s+pipefail" "$SCRIPT"; then
    echo "Falha: O modo de segurança (set -e ou set -euo pipefail) não está ativo."
    exit 1
fi

# 3. Verificar se tem APP_VERSION
if ! grep -q "APP_VERSION=" "$SCRIPT"; then
    echo "Falha: A variável APP_VERSION não foi declarada."
    exit 1
fi

# 4. Testar execução com sucesso
rm -f /home/operator/app_backup.log
echo "dados" > /home/operator/app.log
set +e
OUTPUT=$("$SCRIPT" 2>/dev/null)
STATUS=$?
set -e

if [ "$STATUS" -ne 0 ]; then
    echo "Falha: O script falhou ao rodar no cenário de sucesso (código de saída: $STATUS)."
    exit 1
fi

if [[ "$OUTPUT" != *"Deploy 2.0.1 concluido"* ]]; then
    echo "Falha: A frase de sucesso com a variável APP_VERSION ('Deploy 2.0.1 concluido') não foi encontrada."
    exit 1
fi

# 5. Testar execução com falha (sem o app.log)
rm -f /home/operator/app.log
set +e
"$SCRIPT" >/dev/null 2>&1
STATUS_FALHA=$?
set -e

if [ "$STATUS_FALHA" -eq 0 ]; then
    echo "Falha: Quando o arquivo de log original não existe, o script retornou status de sucesso (0) em vez de falha."
    exit 1
fi

echo "Sucesso: O script consolidado atende a todos os critérios profissionais do módulo!"
exit 0
