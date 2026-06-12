#!/bin/bash
set -euo pipefail

# Cria o script mock de ip com suporte a route
cat << 'EOF' > /usr/local/bin/ip
#!/bin/bash
if [[ "$*" == *"route"* ]]; then
    if [[ "$*" == *"get"* ]]; then
        echo "8.8.8.8 via 192.168.1.1 dev enp3s0 src 192.168.1.10 uid 1000"
        echo "    cache"
    else
        echo "default via 192.168.1.1 dev enp3s0 proto dhcp src 192.168.1.10 metric 100"
        echo "192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.10 metric 100"
    fi
else
    # Fallback para o ip real se necessario
    if [ -f /usr/sbin/ip ]; then
        exec /usr/sbin/ip "$@"
    elif [ -f /sbin/ip ]; then
        exec /sbin/ip "$@"
    else
        echo "ip: command not found" >&2
        exit 127
    fi
fi
EOF
chmod +x /usr/local/bin/ip

chown -R operator:operator /home/operator
