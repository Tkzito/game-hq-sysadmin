#!/bin/bash
set -euo pipefail

# Cria o script mock de ping
cat << 'EOF' > /usr/local/bin/ping
#!/bin/bash
DEST=$(echo "$@" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+")
if [ "$DEST" = "192.168.2.100" ]; then
    echo "PING 192.168.2.100 (192.168.2.100) 56(84) bytes of data."
    for i in {1..4}; do
        echo "From 192.168.1.1 icmp_seq=$i Destination Host Unreachable"
        sleep 0.2
    done
    echo ""
    echo "--- 192.168.2.100 ping statistics ---"
    echo "4 packets transmitted, 0 received, +4 errors, 100% packet loss, time 3054ms"
    exit 1
elif [ "$DEST" = "127.0.0.1" ] || [ "$DEST" = "localhost" ]; then
    echo "PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data."
    for i in {1..4}; do
        echo "64 bytes from 127.0.0.1: icmp_seq=$i ttl=64 time=0.032 ms"
        sleep 0.1
    done
    echo ""
    echo "--- 127.0.0.1 ping statistics ---"
    echo "4 packets transmitted, 4 received, 0% packet loss, time 3003ms"
    exit 0
else
    echo "ping: socket: Operation not permitted" >&2
    exit 2
fi
EOF
chmod +x /usr/local/bin/ping

chown -R operator:operator /home/operator
