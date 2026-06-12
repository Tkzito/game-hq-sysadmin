#!/bin/bash
set -euo pipefail

# Criar pasta de logs e arquivos mock
mkdir -p /var/log/freshbox
touch -d "2 days ago" /var/log/freshbox/old1.log
touch -d "3 days ago" /var/log/freshbox/old2.log
touch /var/log/freshbox/new.log

# Ajustar permissões para que o operator consiga rodar o gzip neles
chown -R operator:operator /var/log/freshbox
chown -R operator:operator /home/operator
