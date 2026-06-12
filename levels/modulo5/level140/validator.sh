#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/freshbox-monitor.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não é executável."
    exit 1
fi

# Resetar ambiente de teste
rm -rf /tmp/freshbox_state/*
rm -f /tmp/systemctl_restarts
rm -f /tmp/curl_attempts_8082
echo "" > /var/log/freshbox/alerts.log

# --- EXECUÇÃO 1 ---
"$SCRIPT_PATH" > /dev/null 2>&1 || true

# O monitor deveria ter detectado a falha do endpoint 8083 e salvo o estado (1 falha)
FAIL_FILES=$(find /tmp/freshbox_state -type f)
if [ -z "$FAIL_FILES" ]; then
    echo "Erro: O script não gravou o arquivo de estado em /tmp/freshbox_state/ após a primeira falha."
    exit 1
fi

# --- EXECUÇÃO 2 ---
"$SCRIPT_PATH" > /dev/null 2>&1 || true

# Na segunda falha seguida de 8083, deve ter gerado um alerta em alerts.log
if [ ! -s /var/log/freshbox/alerts.log ]; then
    echo "Erro: O alerta não foi registrado em /var/log/freshbox/alerts.log após 2 falhas consecutivas."
    exit 1
fi

# --- EXECUÇÃO 3 ---
"$SCRIPT_PATH" > /dev/null 2>&1 || true

# Na terceira falha consecutiva de 8083, deve ter reiniciado o serviço via systemctl
if [ ! -f /tmp/systemctl_restarts ]; then
    echo "Erro: O script não acionou o restart do serviço via systemctl na 3a falha consecutiva."
    exit 1
fi

# Validar o Cron do operator
CRON_CONTENT=$(crontab -u operator -l 2>/dev/null || echo "")
if [[ ! "$CRON_CONTENT" =~ "freshbox-monitor.sh" ]] || [[ ! "$CRON_CONTENT" =~ "*/5" ]]; then
    echo "Erro: O script monitor não está agendado no crontab do 'operator' a cada 5 minutos."
    exit 1
fi

# Validar o Logrotate
LOGROTATE_PATH="/etc/logrotate.d/freshbox"
if [ ! -f "$LOGROTATE_PATH" ]; then
    echo "Erro: Configuração do logrotate em '$LOGROTATE_PATH' não encontrada."
    exit 1
fi

# Validar a sintaxe do logrotate config
logrotate -d "$LOGROTATE_PATH" > /dev/null 2>&1 || {
    echo "Erro: A sintaxe do arquivo de configuração do logrotate em '$LOGROTATE_PATH' é inválida."
    exit 1
}

echo "Sucesso: O desafio integrado do monitor da FreshBox foi validado com êxito!"
exit 0
