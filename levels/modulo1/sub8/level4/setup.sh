#!/bin/bash
# setup.sh - Nível 74
set -euo pipefail

# Criar o arquivo inicial
cat << 'EOF' > /home/operator/system.log
[2026-06-11 08:00:01] SYS: Boot OK
[2026-06-11 08:05:00] SYS: Hardware check complete (100% OK)
EOF

chmod 644 /home/operator/system.log
chown operator:operator /home/operator/system.log

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
