#!/bin/bash
set -euo pipefail

# Configura a senha de operator
echo "operator:operator" | chpasswd

# Configura e inicia o SSH na porta 2222
mkdir -p /var/run/sshd
ssh-keygen -A || true
pkill -f "sshd -p 2222" || true
/usr/sbin/sshd -p 2222 \
    -o "PermitRootLogin=yes" \
    -o "PasswordAuthentication=yes" \
    -o "AuthorizedKeysFile=.ssh/authorized_keys" \
    -o "UsePAM=no"

# Pre-configura as chaves e o atalho SSH filial para o jogador
mkdir -p /home/operator/.ssh
rm -f /home/operator/.ssh/id_ed25519
ssh-keygen -t ed25519 -N "" -f /home/operator/.ssh/id_ed25519

cat /home/operator/.ssh/id_ed25519.pub >> /home/operator/.ssh/authorized_keys

cat << 'EOF' > /home/operator/.ssh/config
Host filial
    HostName localhost
    User operator
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    StrictHostKeyChecking no
EOF

chmod 700 /home/operator/.ssh
chmod 600 /home/operator/.ssh/config /home/operator/.ssh/authorized_keys /home/operator/.ssh/id_ed25519

# Cria o arquivo a ser copiado da filial
echo "Erro de sincronizacao na filial Caruaru: porta 8443 bloqueada" > /var/log/sync.log

# Cria a pasta de backup_scripts que o jogador enviara para a filial
mkdir -p /home/operator/backup_scripts
echo "echo 'Iniciando backup...'" > /home/operator/backup_scripts/script1.sh

# Garante que os destinos comecem limpos
rm -f /home/operator/sync.log
rm -rf /tmp/backup_scripts

chown -R operator:operator /home/operator
