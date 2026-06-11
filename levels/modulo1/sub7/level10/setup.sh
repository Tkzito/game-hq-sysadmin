#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/.dashboard.env
# Dashboard config
DASHBOARD_NAME=AURA-Console
DASHBOARD_PORT=9000
EOF
touch /home/operator/configurar_dashboard.sh
chmod +x /home/operator/configurar_dashboard.sh
