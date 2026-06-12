#!/bin/bash
set -euo pipefail

# Criar a pasta de configuração e o arquivo backup.conf
mkdir -p /etc/freshbox
touch /etc/freshbox/backup.conf

# Criar o diretório para o link simbólico e criar o link pointing para o backup.conf
mkdir -p /var/freshbox
rm -f /var/freshbox/current
ln -s /etc/freshbox/backup.conf /var/freshbox/current

# Remover o diretório de backup para forçar o script a criá-lo
rm -rf /mnt/backup

chown -R operator:operator /home/operator
