#!/bin/bash
set -euo pipefail

CRON_CONTENT=$(crontab -u operator -l 2>/dev/null || echo "")

if [ -z "$CRON_CONTENT" ]; then
    echo "Erro: O crontab do usuário 'operator' está vazio."
    exit 1
fi

# Verificar agendamento de healthcheck (*/5 * * * * ou similar)
if [[ ! "$CRON_CONTENT" =~ "healthcheck.sh" ]]; then
    echo "Erro: O script '/opt/freshbox/healthcheck.sh' não foi agendado no crontab."
    exit 1
fi

if [[ ! "$CRON_CONTENT" =~ "*/5" ]]; then
    echo "Erro: O agendamento para rodar a cada 5 minutos (*/5) não foi encontrado."
    exit 1
fi

# Verificar agendamento de backup (30 2 * * *)
if [[ ! "$CRON_CONTENT" =~ "backup.sh" ]]; then
    echo "Erro: O script '/opt/freshbox/backup.sh' não foi agendado no crontab."
    exit 1
fi

if [[ ! "$CRON_CONTENT" =~ "30 2" ]]; then
    echo "Erro: O agendamento para as 2h30 da manhã (30 2) não foi encontrado no crontab."
    exit 1
fi

echo "Sucesso: Tarefas agendadas no cron com sucesso!"
exit 0
