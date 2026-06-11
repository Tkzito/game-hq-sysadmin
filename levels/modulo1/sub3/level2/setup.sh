#!/bin/bash
# setup.sh - Nível 22
set -euo pipefail

# Criar alguns arquivos espalhados no home
cat << 'EOF' > /home/operator/auth_failure.log
Jan 10 12:00:00 connection failed
EOF

cat << 'EOF' > /home/operator/database_query.log
Jan 10 12:05:00 SELECT * FROM users;
EOF

cat << 'EOF' > /home/operator/config.old
# Configurações legadas
TIMEOUT=30
MAX_CONN=100
EOF

# Arquivo que NÃO deve ser movido ou renomeado
cat << 'EOF' > /home/operator/instructions.txt
Siga as instruções do briefing.
EOF

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
