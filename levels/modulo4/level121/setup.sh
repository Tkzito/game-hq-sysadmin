#!/bin/bash
set -euo pipefail

# Cria o script mock de ip
cat << 'EOF' > /usr/local/bin/ip
#!/bin/bash
if [[ "$*" == *"addr"* ]] || [[ "$*" == *"address"* ]]; then
    echo "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000"
    echo "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00"
    echo "    inet 127.0.0.1/8 scope host lo"
    echo "       valid_lft forever preferred_lft forever"
    echo "2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000"
    echo "    link/ether 52:54:00:12:34:56 brd ff:ff:ff:ff:ff:ff"
    echo "    inet 192.168.1.10/24 brd 192.168.1.255 scope global dynamic enp3s0"
    echo "       valid_lft 86120sec preferred_lft 86120sec"
elif [[ "$*" == *"link"* ]]; then
    echo "1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000"
    echo "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00"
    echo "2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000"
    echo "    link/ether 52:54:00:12:34:56 brd ff:ff:ff:ff:ff:ff"
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
