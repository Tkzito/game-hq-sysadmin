#!/bin/bash
set -euo pipefail

SYNC_PID_FILE="/var/run/radiologia_sync.pid"
STUCK_PID_FILE="/var/run/radiologia_stuck.pid"
SYNC_EXIT_FILE="/var/log/radiologia_sync.exit"

if [ ! -f "$SYNC_PID_FILE" ] || [ ! -f "$STUCK_PID_FILE" ]; then
    echo "Erro: O ambiente de simulação não foi inicializado corretamente."
    exit 1
fi

SYNC_PID=$(cat "$SYNC_PID_FILE" | tr -d '[:space:]')
STUCK_PID=$(cat "$STUCK_PID_FILE" | tr -d '[:space:]')

# 1. Verifica se radiologia_sync ainda esta rodando
if kill -0 "$SYNC_PID" >/dev/null 2>&1; then
    echo "Erro: O processo radiologia_sync (PID $SYNC_PID) ainda esta em execucao. Encerre-o com SIGTERM."
    exit 1
fi

# 2. Verifica se radiologia_sync foi encerrado com SIGTERM (gravando o log de saida)
if [ ! -f "$SYNC_EXIT_FILE" ]; then
    echo "Erro: O processo radiologia_sync foi finalizado, mas nao gravou seu estado de saida. Voce usou SIGKILL (-9) diretamente? Ele deveria ser encerrado graciosamente com SIGTERM (-15)."
    exit 1
fi

# 3. Verifica se radiologia_stuck ainda esta rodando
if kill -0 "$STUCK_PID" >/dev/null 2>&1; then
    echo "Erro: O processo radiologia_stuck (PID $STUCK_PID) ainda esta em execucao. Tente usar SIGKILL, ja que ele ignora o SIGTERM."
    exit 1
fi

echo "Sucesso: Voce encerrou o radiologia_sync com SIGTERM e o radiologia_stuck com SIGKILL!"
exit 0
