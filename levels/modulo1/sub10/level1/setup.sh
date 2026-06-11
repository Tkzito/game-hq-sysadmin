#!/bin/bash
cat << 'EOF' > /home/operator/logs.txt
[INFO] System booted successfully.
[WARN] Low disk space on /dev/sda1.
[ERROR] Failed to bind to port 80.
[INFO] Retrying binding to port 8080.
[WARN] Latency anomaly detected.
[ERROR] Database backup failed.
EOF
chown -R operator:operator /home/operator
chmod 644 /home/operator/logs.txt
