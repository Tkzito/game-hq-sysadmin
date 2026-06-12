#!/bin/bash
set -euo pipefail

# Criar pasta de logs com permissões abertas para o operador escrever
mkdir -p /var/log/freshbox
chmod 777 /var/log/freshbox

chown -R operator:operator /home/operator
