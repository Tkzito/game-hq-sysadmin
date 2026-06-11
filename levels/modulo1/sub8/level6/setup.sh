#!/bin/bash
# setup.sh - Nível 76
set -euo pipefail

# Criar arquivo de log com várias mensagens
cat << 'EOF' > /home/operator/servidor.log
[INFO] 10:00:00 Inicializando modulo de rede
[WARNING] 10:01:15 Latência alta detectada no canal 2
[ERROR] 10:02:30 Conexão recusada pelo banco de dados central
[INFO] 10:03:00 Tentando reconectar ao banco de dados
[ERROR] 10:04:12 Timeout ao tentar estabelecer handshake SSL
[INFO] 10:05:00 Sistema operando em modo de segurança parcial
[ERROR] 10:05:55 Falha crítica na integridade de arquivos do sistema
EOF

chmod 644 /home/operator/servidor.log
chown operator:operator /home/operator/servidor.log

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
