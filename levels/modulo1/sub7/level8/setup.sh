#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/hosts.txt
127.0.0.1 localhost
8.8.8.8 dns.google
EOF
rm -f /home/operator/hosts.txt.bak
