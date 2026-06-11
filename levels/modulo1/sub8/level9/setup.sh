#!/bin/bash
# setup.sh - Nível 79
set -euo pipefail

# Criar arquivo app.log com mensagens repetidas
# 10 Database down
# 8 Timeout
# 5 Connection failed
# 2 Permission denied
# 3 [WARNING] Disk low
# 1 [INFO] Server started
cat << 'EOF' > /home/operator/app.log
[INFO] Server started
[ERROR] Connection failed
[ERROR] Connection failed
[ERROR] Database down
[ERROR] Database down
[ERROR] Database down
[ERROR] Timeout
[ERROR] Database down
[ERROR] Database down
[ERROR] Connection failed
[ERROR] Timeout
[ERROR] Timeout
[ERROR] Timeout
[ERROR] Database down
[ERROR] Database down
[ERROR] Connection failed
[ERROR] Connection failed
[ERROR] Timeout
[ERROR] Timeout
[ERROR] Timeout
[ERROR] Timeout
[ERROR] Database down
[ERROR] Database down
[ERROR] Database down
[WARNING] Disk low
[WARNING] Disk low
[WARNING] Disk low
[ERROR] Permission denied
[ERROR] Permission denied
EOF

chmod 644 /home/operator/app.log
chown operator:operator /home/operator/app.log

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
