#!/bin/bash
set -euo pipefail

# Garante que nao haja nenhuma entrada anterior do host no /etc/hosts
sed -i '/filial-caruaru.saoluis.local/d' /etc/hosts

chown -R operator:operator /home/operator
