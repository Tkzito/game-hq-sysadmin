#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/config.env
# Configuracoes Globais do Sistema
PORT=8080

HOST=127.0.0.1
# Credenciais criticas
DB_USER=root
EOF
touch /home/operator/parser.sh
chmod +x /home/operator/parser.sh
