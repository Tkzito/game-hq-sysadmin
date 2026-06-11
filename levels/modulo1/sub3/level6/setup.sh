#!/bin/bash
# setup.sh - Nível 26
set -euo pipefail

# Criar log temporário
cat << 'EOF' > /home/operator/log_antigo.log
2026-06-11 00:00:01 - System boot initialized
2026-06-11 00:01:10 - Checking hardware components
2026-06-11 00:02:15 - Load average normal
2026-06-11 00:03:00 - Debug: Key loaded internally.
2026-06-11 00:03:05 - System variable: SECRET_ACCESS_KEY="KEY_DEC_8891_AURA_SECURE"
2026-06-11 00:04:12 - Network interface eth0 up
2026-06-11 00:05:00 - Cron job running database backup
EOF

# Compactar com gzip
gzip /home/operator/log_antigo.log

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
