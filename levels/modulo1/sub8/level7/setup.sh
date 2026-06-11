#!/bin/bash
# setup.sh - Nível 77
set -euo pipefail

# Criar lista de IPs repetidos e desordenados
cat << 'EOF' > /home/operator/access.log
192.168.1.10
10.0.0.5
192.168.1.10
172.16.0.2
10.0.0.5
192.168.1.50
172.16.0.2
192.168.1.10
EOF

chmod 644 /home/operator/access.log
chown operator:operator /home/operator/access.log

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
