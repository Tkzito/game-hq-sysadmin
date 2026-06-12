#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/log_monitor.sh"
LOGROTATE_PATH="/etc/logrotate.d/freshbox"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não é executável."
    exit 1
fi

if [ ! -f "$LOGROTATE_PATH" ]; then
    echo "Erro: A configuração do logrotate em '$LOGROTATE_PATH' não foi encontrada."
    exit 1
fi

# Testar se o script do usuário gera o arquivo com a data atual
TODAY=$(date +%Y-%m-%d)
EXPECTED_LOG="/var/log/freshbox/healthcheck-$TODAY.log"

rm -f "$EXPECTED_LOG"
"$SCRIPT_PATH" > /dev/null 2>&1 || true

if [ ! -f "$EXPECTED_LOG" ]; then
    echo "Erro: O script não gerou o arquivo de log esperado em '$EXPECTED_LOG'."
    exit 1
fi

# Validar o logrotate
LOGROTATE_CONTENT=$(cat "$LOGROTATE_PATH")
if [[ ! "$LOGROTATE_CONTENT" =~ "/var/log/freshbox/" ]]; then
    echo "Erro: O logrotate não está configurado para ler logs de /var/log/freshbox/."
    exit 1
fi

if [[ ! "$LOGROTATE_CONTENT" =~ "rotate" ]] || [[ ! "$LOGROTATE_CONTENT" =~ "compress" ]]; then
    echo "Erro: A configuração do logrotate deve conter diretivas de rotação (rotate) e compressão (compress)."
    exit 1
fi

# Validar sintaxe da config do logrotate usando modo debug (-d)
logrotate -d "$LOGROTATE_PATH" > /dev/null 2>&1 || {
    echo "Erro: A sintaxe do arquivo de configuração do logrotate é inválida."
    exit 1
}

echo "Sucesso: O script de logs e a rotação foram configurados corretamente!"
exit 0
