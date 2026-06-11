#!/bin/bash
# setup.sh - Nível 78
set -euo pipefail

# Criar arquivo de logs de autenticação
cat << 'EOF' > /home/operator/seguranca.log
[2026-06-11 09:00:00] AUTH: FAIL for user admin
[2026-06-11 09:01:00] AUTH: SUCCESS for user operator
[2026-06-11 09:02:15] AUTH: FAIL for user root
[2026-06-11 09:03:00] AUTH: FAIL for user guest
[2026-06-11 09:04:10] AUTH: SUCCESS for user operator
[2026-06-11 09:05:00] AUTH: FAIL for user oracle
EOF

chmod 644 /home/operator/seguranca.log
chown operator:operator /home/operator/seguranca.log

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
