#!/bin/bash
set -euo pipefail

# 1. Cria diretorio de logs e os arquivos iniciais
mkdir -p /var/log
echo "registro de radiografia atual 2026..." > /var/log/radiologia_sync.log
echo "dados de logs antigos de 2025 parte 1..." > /var/log/radiologia_sync.log.1
echo "dados de logs antigos de 2025 parte 2..." > /var/log/radiologia_sync.log.2
rm -f /var/log/radiologia_sync.exit
rm -f /var/run/radiologia_sync.pid
rm -f /var/run/backup_dental.pid

# 2. Cria os scripts dos servicos
cat << 'EOF' > /usr/local/bin/radiologia_sync
#!/bin/bash
trap "echo 'Terminated' > /var/log/radiologia_sync.exit; exit 0" SIGTERM
while true; do
    sleep 0.1
done
EOF
chmod +x /usr/local/bin/radiologia_sync

cat << 'EOF' > /usr/local/bin/backup_dental.sh
#!/bin/bash
while true; do
    sleep 1
done
EOF
chmod +x /usr/local/bin/backup_dental.sh

cat << 'EOF' > /usr/local/bin/agendamento.sh
#!/bin/bash
while true; do
    sleep 1
done
EOF
chmod +x /usr/local/bin/agendamento.sh

# 3. Cria o mock do systemctl
cat << 'EOF' > /usr/local/bin/systemctl
#!/bin/bash
ACTION=$1
SERVICE=$2

if [ "$SERVICE" != "agendamento" ]; then
    echo "systemctl: servico desconhecido ou nao configurado nesta simulacao" >&2
    exit 1
fi

if [ "$ACTION" = "status" ]; then
    if pgrep -f "agendamento.sh" >/dev/null; then
        echo "● agendamento.service - Servico de Agendamento OralTech"
        echo "     Loaded: loaded (/etc/systemd/system/agendamento.service; enabled)"
        echo "     Active: active (running) since $(date)"
        echo "   Main PID: $(pgrep -f 'agendamento.sh' | head -n 1)"
    else
        echo "● agendamento.service - Servico de Agendamento OralTech"
        echo "     Loaded: loaded (/etc/systemd/system/agendamento.service; enabled)"
        echo "     Active: inactive (dead)"
    fi
elif [ "$ACTION" = "start" ]; then
    if ! pgrep -f "agendamento.sh" >/dev/null; then
        nohup su - operator -c "exec -a agendamento.sh /usr/local/bin/agendamento.sh" >/dev/null 2>&1 &
    fi
    echo "Starting agendamento.service..."
elif [ "$ACTION" = "stop" ]; then
    pkill -f "agendamento.sh" || true
    echo "Stopping agendamento.service..."
fi
EOF
chmod +x /usr/local/bin/systemctl

# 4. Cria o mock do df
cat << 'EOF' > /usr/local/bin/df
#!/bin/bash
USED_VAR=19
AVAIL_VAR=0.5
USE_VAR=97

# Se ambos os arquivos antigos foram removidos ou compactados (nao estao mais como texto puro no diretorio)
if [ ! -f /var/log/radiologia_sync.log.1 ] && [ ! -f /var/log/radiologia_sync.log.2 ]; then
    # Se foram compactados (os arquivos .gz existem)
    if [ -f /var/log/radiologia_sync.log.1.gz ] || [ -f /var/log/radiologia_sync.log.2.gz ]; then
        USED_VAR=12
        AVAIL_VAR=7.5
        USE_VAR=62
    else
        # Se foram totalmente deletados
        USED_VAR=10
        AVAIL_VAR=9.5
        USE_VAR=51
    fi
fi

echo "Filesystem      Size  Used Avail Use% Mounted on"
echo "/dev/sda1        40G   12G   26G  32% /"
echo "/dev/sda2        20G   ${USED_VAR}G  ${AVAIL_VAR}G  ${USE_VAR}% /var"
echo "/dev/sda3        50G   10G   37G  22% /home"
EOF
chmod +x /usr/local/bin/df

# 5. Cria o mock do free
cat << 'EOF' > /usr/local/bin/free
#!/bin/bash
if pgrep -f "radiologia_sync" >/dev/null; then
    echo "               total        used        free      shared  buff/cache   available"
    echo "Mem:           7.8Gi       7.2Gi       150Mi        12Mi       450Mi       350Mi"
    echo "Swap:          2.0Gi       1.8Gi       200Mi"
else
    echo "               total        used        free      shared  buff/cache   available"
    echo "Mem:           7.8Gi       2.2Gi       5.1Gi        12Mi       500Mi       5.4Gi"
    echo "Swap:          2.0Gi       0.1Gi       1.9Gi"
fi
EOF
chmod +x /usr/local/bin/free

# 6. Inicia os processos iniciais
nohup su - operator -c "exec -a radiologia_sync /usr/local/bin/radiologia_sync" >/dev/null 2>&1 &
nohup su - operator -c "exec -a backup_dental.sh /usr/local/bin/backup_dental.sh" >/dev/null 2>&1 &
sleep 0.5

# Captura os PIDs corretos dos processos reais
SYNC_PID=$(pgrep -f "radiologia_sync" | head -n 1 || echo "")
BACKUP_PID=$(pgrep -f "backup_dental.sh" | head -n 1 || echo "")

if [ -n "$SYNC_PID" ]; then
    echo "$SYNC_PID" > /var/run/radiologia_sync.pid
fi

if [ -n "$BACKUP_PID" ]; then
    echo "$BACKUP_PID" > /var/run/backup_dental.pid
fi

chown -R operator:operator /home/operator
