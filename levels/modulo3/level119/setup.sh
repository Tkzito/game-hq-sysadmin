#!/bin/bash
set -euo pipefail

# Cria o script de backup dental
cat << 'EOF' > /usr/local/bin/backup_dental.sh
#!/bin/bash
while true; do
    sleep 0.5
done
EOF
chmod +x /usr/local/bin/backup_dental.sh

# Inicia o backup em background como operator com nice 0 (padrao)
nohup su - operator -c "exec -a backup_dental.sh /usr/local/bin/backup_dental.sh" >/dev/null 2>&1 &
sleep 0.5

# Captura o PID real do backup_dental.sh
PID=$(pgrep -f "backup_dental.sh" | head -n 1 || echo "")
if [ -n "$PID" ]; then
    echo "$PID" > /var/run/backup_dental.pid
else
    echo "$!" > /var/run/backup_dental.pid
fi

chown -R operator:operator /home/operator
