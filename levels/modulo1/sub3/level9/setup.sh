#!/bin/bash
# setup.sh - Nível 29
set -euo pipefail

mkdir -p /home/operator/configs/nested

echo "db host" > /home/operator/configs/db.conf
echo "web port" > /home/operator/configs/web.conf
echo "auth secret" > /home/operator/configs/nested/auth.conf
echo "public description" > /home/operator/configs/public.txt

# Definir permissões iniciais abertas (644)
chmod 644 /home/operator/configs/db.conf
chmod 644 /home/operator/configs/web.conf
chmod 644 /home/operator/configs/nested/auth.conf
chmod 644 /home/operator/configs/public.txt

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
