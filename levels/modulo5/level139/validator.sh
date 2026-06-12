#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/healthcheck_restart.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não é executável."
    exit 1
fi

# Resetar estados
rm -f /tmp/systemctl_restarts
echo "0" > /tmp/curl_attempts_139
echo "" > /var/log/freshbox/healthcheck.log

# Rodar o script do usuário
"$SCRIPT_PATH" > /dev/null 2>&1 || true

# Verificar se houve restart pelo systemctl mockado
if [ ! -f /tmp/systemctl_restarts ]; then
    echo "Erro: O script não tentou reiniciar o serviço via systemctl após falha do healthcheck."
    exit 1
fi

# Verificar se registrou logs
if [ ! -s /var/log/freshbox/healthcheck.log ]; then
    echo "Erro: O arquivo de log '/var/log/freshbox/healthcheck.log' não foi preenchido."
    exit 1
fi

echo "Sucesso: O script de healthcheck com restart automático foi validado!"
exit 0
