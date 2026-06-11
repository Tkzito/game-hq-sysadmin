#!/bin/bash
# setup.sh - Nível 24
set -euo pipefail

mkdir -p /home/operator/evidencias

# Criar arquivos de evidências
cat << 'EOF' > /home/operator/evidencias/suspect_ips.txt
192.168.1.100
10.0.0.50
8.8.8.8
EOF

cat << 'EOF' > /home/operator/evidencias/malicious_payload.bin
\x7fELF\x02\x01\x01\x00malicious-code-placeholder
EOF

cat << 'EOF' > /home/operator/evidencias/access_logs_compromised.log
2026-06-11 08:00:00 - Failed login from admin
2026-06-11 08:01:23 - Privilege escalation attempt
EOF

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
