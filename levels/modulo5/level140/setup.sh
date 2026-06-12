#!/bin/bash
set -euo pipefail

# Criar diretórios necessários
mkdir -p /tmp/freshbox_state
mkdir -p /var/log/freshbox
touch /var/log/freshbox/alerts.log
chmod -R 777 /tmp/freshbox_state
chmod -R 777 /var/log/freshbox

# Mock do systemctl que grava restarts no /tmp/systemctl_restarts
rm -f /tmp/systemctl_restarts
cat << 'EOF' > /usr/local/bin/systemctl
#!/bin/bash
if [ "$1" = "restart" ]; then
    echo "$2" >> /tmp/systemctl_restarts
    exit 0
fi
if [ "$1" = "is-active" ]; then
    exit 0
fi
exit 0
EOF
chmod +x /usr/local/bin/systemctl

# Mock do curl para 3 endpoints com comportamentos distintos:
# 8081 -> sempre sucesso (200)
# 8082 -> falha na primeira, depois sucesso (teste de recovery)
# 8083 -> sempre falha (para testar limite de restarts e alertas)
rm -f /tmp/curl_attempts_8082
cat << 'EOF' > /usr/local/bin/curl
#!/bin/bash
if [[ "$*" == *"8081"* ]]; then
    exit 0
fi
if [[ "$*" == *"8082"* ]]; then
    count=0
    if [ -f /tmp/curl_attempts_8082 ]; then
        count=$(cat /tmp/curl_attempts_8082)
    fi
    count=$((count + 1))
    echo "$count" > /tmp/curl_attempts_8082
    if [ "$count" -eq 1 ]; then
        exit 7
    else
        exit 0
    fi
fi
if [[ "$*" == *"8083"* ]]; then
    exit 7
fi
/usr/bin/curl "$@"
EOF
chmod +x /usr/local/bin/curl

chown -R operator:operator /home/operator
