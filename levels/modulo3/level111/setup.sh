#!/bin/bash
set -euo pipefail

# Cria o binario simulado de radiologia_sync
cat << 'EOF' > /usr/local/bin/radiologia_sync
#!/bin/bash
# Simula processo consumindo CPU de forma controlada
while true; do
    sleep 0.1
done
EOF
chmod +x /usr/local/bin/radiologia_sync

# Executa o processo como operator em background
nohup su - operator -c "exec -a radiologia_sync /usr/local/bin/radiologia_sync" >/dev/null 2>&1 &
sleep 0.5

# Captura o PID real do processo
PID=$(pgrep -f "radiologia_sync" | head -n 1 || echo "")
if [ -n "$PID" ]; then
    echo "$PID" > /var/run/radiologia_sync.pid
else
    # Fallback se pgrep falhar
    echo "$!" > /var/run/radiologia_sync.pid
fi

chown -R operator:operator /home/operator
