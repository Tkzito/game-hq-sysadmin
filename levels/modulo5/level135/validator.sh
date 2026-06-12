#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/modular_monitor.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não tem permissão de execução."
    exit 1
fi

# Resetar log de falhas antes de testar
echo "" > /var/log/freshbox/failures.log

# Rodar o script do usuário (ignorar exit code caso o script falhe intencionalmente ao achar falha)
"$SCRIPT_PATH" > /dev/null 2>&1 || true

# Verificar se registrou a falha do db01 no log
if ! grep -q "db01" /var/log/freshbox/failures.log; then
    echo "Erro: A falha no serviço db01 não foi registrada no failures.log."
    exit 1
fi

# Verificar se usa funções com escopo local
CONTENT=$(cat "$SCRIPT_PATH")
if [[ ! "$CONTENT" =~ "local " ]]; then
    echo "Erro: O script deve usar escopo de variáveis locais ('local') dentro das funções."
    exit 1
fi

echo "Sucesso: O script de monitoramento modular funciona e utiliza boas práticas!"
exit 0
