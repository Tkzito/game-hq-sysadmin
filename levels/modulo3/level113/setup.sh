#!/bin/bash
set -euo pipefail

# Remove logs e arquivos de saida antigos
rm -f /var/log/radiologia_sync.exit
rm -f /var/run/radiologia_sync.pid
rm -f /var/run/radiologia_stuck.pid

# Cria o binario de radiologia_sync (aceita SIGTERM e finaliza limpo)
cat << 'EOF' > /usr/local/bin/radiologia_sync
#!/bin/bash
trap "echo 'Terminated' > /var/log/radiologia_sync.exit; exit 0" SIGTERM
while true; do
    sleep 0.5
done
EOF
chmod +x /usr/local/bin/radiologia_sync

# Cria o binario de radiologia_stuck (ignora SIGTERM)
cat << 'EOF' > /usr/local/bin/radiologia_stuck
#!/bin/bash
trap "" SIGTERM
while true; do
    sleep 0.5
done
EOF
chmod +x /usr/local/bin/radiologia_stuck

# Inicia os processos como operator em background
nohup su - operator -c "exec -a radiologia_sync /usr/local/bin/radiologia_sync" >/dev/null 2>&1 &
nohup su - operator -c "exec -a radiologia_stuck /usr/local/bin/radiologia_stuck" >/dev/null 2>&1 &
sleep 0.5

# Captura os PIDs corretos dos processos filhos reais
SYNC_PID=$(pgrep -f "radiologia_sync" | head -n 1 || echo "")
STUCK_PID=$(pgrep -f "radiologia_stuck" | head -n 1 || echo "")

if [ -n "$SYNC_PID" ]; then
    echo "$SYNC_PID" > /var/run/radiologia_sync.pid
fi

if [ -n "$STUCK_PID" ]; then
    echo "$STUCK_PID" > /var/run/radiologia_stuck.pid
fi

chown -R operator:operator /home/operator
