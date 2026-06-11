#!/bin/bash
# setup.sh - Nível 30
set -euo pipefail

mkdir -p /home/operator/sistema/nested

# Criar arquivos regulares do sistema
echo "PORT=80" > /home/operator/sistema/app.conf
echo "Normal activity logs" > /home/operator/sistema/nested/clean.log

# Criar arquivos .bak do hacker
echo "hacker traces 1" > /home/operator/sistema/hacker_log.bak
echo "hacker traces 2" > /home/operator/sistema/nested/secret_leak.bak

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
