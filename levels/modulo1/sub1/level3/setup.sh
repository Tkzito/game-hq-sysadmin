#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 3
set -euo pipefail

# Garantir estrutura do operator
mkdir -p /home/operator
cd /home/operator

# Criar a chave oculta
echo "CHAVE-SOLAR-9982" > .chave_bateria.txt
chmod 600 .chave_bateria.txt

# Criar arquivos normais (distração)
echo "Log de bateria normal: Status OK" > bateria.log
echo "Sistema solar operando a 12V..." > solar.conf
mkdir -p backups

chown -R operator:operator /home/operator
