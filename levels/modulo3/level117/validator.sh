#!/bin/bash
set -euo pipefail

# 1. Verifica se o script backup_dental.sh esta rodando
PID=$(pgrep -f "/usr/local/bin/backup_dental.sh" || true)

if [ -z "$PID" ]; then
    echo "Erro: O processo backup_dental.sh nao esta rodando. Execute-o em background."
    exit 1
fi

# 2. Verifica se o nohup foi utilizado
NOHUP_USED=false
if [ -f /home/operator/nohup.out ] || [ -f ./nohup.out ] || [ -f /home/operator/backup_dental.log ] || [ -f /var/log/backup_dental.log ]; then
    # Se o log de saída foi gerado, já é um bom indicativo. Mas vamos checar o bash_history e nohup.out especificamente.
    if [ -f /home/operator/nohup.out ] || [ -f ./nohup.out ]; then
        NOHUP_USED=true
    fi
fi

HISTFILE="/home/operator/.bash_history"
if [ -f "$HISTFILE" ]; then
    if grep -q "nohup" "$HISTFILE"; then
        NOHUP_USED=true
    fi
fi

# Fallback: Se o processo foi desassociado e virou filho do init (PPID=1), também consideramos sucesso.
PPID_VAL=$(ps -o ppid= -p "$PID" | tr -d '[:space:]')
if [ "$PPID_VAL" = "1" ]; then
    NOHUP_USED=true
fi

if [ "$NOHUP_USED" = "false" ]; then
    echo "Erro: Voce rodou o backup em background, mas nao usou o 'nohup' ou nao redirecionou a saida adequadamente para sobreviver ao logout."
    exit 1
fi

echo "Sucesso: O processo backup_dental.sh esta rodando em segundo plano protegido com nohup!"
exit 0
