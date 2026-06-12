#!/bin/bash
set -euo pipefail

# Mock do systemctl
rm -f /tmp/systemctl_restarts
cat << 'EOF' > /usr/local/bin/systemctl
#!/bin/bash
if [ "$1" = "restart" ] && [ "$2" = "freshbox-api" ]; then
    echo "1" >> /tmp/systemctl_restarts
    exit 0
fi
if [ "$1" = "is-active" ] && [ "$2" = "freshbox-api" ]; then
    exit 0
fi
exit 0
EOF
chmod +x /usr/local/bin/systemctl

# Mock do curl (falha nas duas primeiras chamadas ao localhost, depois passa)
rm -f /tmp/curl_attempts_139
cat << 'EOF' > /usr/local/bin/curl
#!/bin/bash
if [[ "$*" == *"http://localhost:8080/health"* ]]; then
    count=0
    if [ -f /tmp/curl_attempts_139 ]; then
        count=$(cat /tmp/curl_attempts_139)
    fi
    count=$((count + 1))
    echo "$count" > /tmp/curl_attempts_139
    
    if [ "$count" -lt 3 ]; then
        exit 7
    else
        exit 0
    fi
fi
/usr/bin/curl "$@"
EOF
chmod +x /usr/local/bin/curl

# Criar pasta de logs
mkdir -p /var/log/freshbox
touch /var/log/freshbox/healthcheck.log
chmod 777 /var/log/freshbox/healthcheck.log

chown -R operator:operator /var/log/freshbox
chown -R operator:operator /home/operator
