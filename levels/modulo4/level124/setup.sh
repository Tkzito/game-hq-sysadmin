#!/bin/bash
set -euo pipefail

# Cria o script mock de traceroute
cat << 'EOF' > /usr/local/bin/traceroute
#!/bin/bash
DEST=$(echo "$@" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+")
if [ "$DEST" = "192.168.2.100" ]; then
    echo "traceroute to 192.168.2.100 (192.168.2.100), 30 hops max, 60 byte packets"
    echo " 1  192.168.1.1 (192.168.1.1)  1.052 ms  0.984 ms  0.952 ms"
    echo " 2  10.0.0.1 (10.0.0.1)  4.120 ms  4.050 ms  3.990 ms"
    echo " 3  200.201.202.1 (200.201.202.1)  12.450 ms  12.380 ms  12.310 ms"
    echo " 4  200.201.202.5 (200.201.202.5)  18.150 ms  18.080 ms  18.010 ms"
    echo " 5  172.16.5.1 (172.16.5.1)  25.400 ms  25.320 ms  25.250 ms"
    echo " 6  172.16.5.2 (172.16.5.2)  32.120 ms  32.050 ms  31.980 ms"
    echo " 7  172.16.10.2 (172.16.10.2)  38.540 ms  38.480 ms  38.410 ms"
    echo " 8  * * *"
    echo " 9  * * *"
    exit 0
else
    echo "traceroute: unknown host $DEST" >&2
    exit 1
fi
EOF
chmod +x /usr/local/bin/traceroute

# Cria o script mock de tracepath
cat << 'EOF' > /usr/local/bin/tracepath
#!/bin/bash
DEST=$(echo "$@" | grep -oE "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+")
if [ "$DEST" = "192.168.2.100" ]; then
    echo " 1?: [localhost]                                         pmtu 1500"
    echo " 1:  192.168.1.1                                           1.052ms"
    echo " 2:  10.0.0.1                                              4.120ms"
    echo " 3:  200.201.202.1                                        12.450ms"
    echo " 4:  200.201.202.5                                        18.150ms"
    echo " 5:  172.16.5.1                                           25.400ms"
    echo " 6:  172.16.5.2                                           32.120ms"
    echo " 7:  172.16.10.2                                           38.540ms"
    echo " 8:  no reply"
    exit 0
else
    echo "tracepath: unknown host $DEST" >&2
    exit 1
fi
EOF
chmod +x /usr/local/bin/tracepath

chown -R operator:operator /home/operator
