#!/bin/bash
set -euo pipefail

# Configura a senha do operator como 'operator' para permitir ssh-copy-id inicial
echo "operator:operator" | chpasswd

# Cria diretorio do sshd
mkdir -p /var/run/sshd

# Garante a geracao de host keys se nao existirem
ssh-keygen -A || true

# Para qualquer instancia anterior do sshd na porta 2222
pkill -f "sshd -p 2222" || true

# Inicia o SSH Daemon na porta 2222 rodando em background
# Desabilita o PAM para evitar bloqueios em ambiente de container restrito
/usr/sbin/sshd -p 2222 \
    -o "PermitRootLogin=yes" \
    -o "PasswordAuthentication=yes" \
    -o "AuthorizedKeysFile=.ssh/authorized_keys" \
    -o "UsePAM=no"

# Limpa configuracoes antigas de SSH do operator
rm -rf /home/operator/.ssh

chown -R operator:operator /home/operator
