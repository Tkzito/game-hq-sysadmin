#!/bin/bash
set -euo pipefail

# 1. Validacao do Processo radiologia_sync (CPU hog)
SYNC_PID_FILE="/var/run/radiologia_sync.pid"
if [ -f "$SYNC_PID_FILE" ]; then
    SYNC_PID=$(cat "$SYNC_PID_FILE" | tr -d '[:space:]')
    if kill -0 "$SYNC_PID" >/dev/null 2>&1; then
        echo "Erro: O processo radiologia_sync (PID $SYNC_PID) ainda esta em execucao consumindo a CPU."
        exit 1
    fi
fi

# Verifica se foi finalizado graciosamente via SIGTERM
if [ ! -f /var/log/radiologia_sync.exit ]; then
    echo "Erro: O processo radiologia_sync foi finalizado, mas nao salvou seu estado. Voce usou SIGKILL (-9)? Para evitar corrupcao de dados, encerre-o com SIGTERM (-15)."
    exit 1
fi

# 2. Validacao de Espaco em Disco e Auditoria LGPD
if [ ! -f /var/log/radiologia_sync.log ]; then
    echo "Erro: O arquivo de log atual (/var/log/radiologia_sync.log) foi deletado! Isto viola as regras de auditoria da LGPD. Reinicie o desafio e remova apenas os logs antigos (.1 e .2)."
    exit 1
fi

if [ -f /var/log/radiologia_sync.log.1 ] || [ -f /var/log/radiologia_sync.log.2 ]; then
    echo "Erro: Os logs antigos (/var/log/radiologia_sync.log.1 ou .2) ainda estao ocupando espaco no disco. Comprima-os com gzip ou remova-os."
    exit 1
fi

# 3. Validacao de Prioridade do Backup
BACKUP_PID_FILE="/var/run/backup_dental.pid"
if [ -f "$BACKUP_PID_FILE" ]; then
    BACKUP_PID=$(cat "$BACKUP_PID_FILE" | tr -d '[:space:]')
    if ! kill -0 "$BACKUP_PID" >/dev/null 2>&1; then
        echo "Erro: O processo backup_dental.sh nao esta rodando."
        exit 1
    fi
    NICE_VAL=$(ps -o nice= -p "$BACKUP_PID" | tr -d '[:space:]')
    if [ "$NICE_VAL" != "19" ]; then
        echo "Erro: O processo de backup ainda nao foi renomeado para prioridade baixa (nice 19). Use 'renice 19 -p $BACKUP_PID'."
        exit 1
    fi
else
    echo "Erro: Processo de backup nao encontrado."
    exit 1
fi

# 4. Validacao do Servico de Agendamento
if ! pgrep -f "/usr/local/bin/agendamento.sh" >/dev/null; then
    echo "Erro: O servico de agendamento ainda nao foi iniciado. Use 'sudo systemctl start agendamento' para restaura-lo."
    exit 1
fi

echo "Sucesso: O servidor foi remediado completamente! CPU normalizada, espaco liberado sem perda de auditoria, prioridade ajustada e servico de agendamento restaurado!"
exit 0
