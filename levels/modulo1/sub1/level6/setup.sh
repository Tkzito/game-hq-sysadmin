#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 6
set -euo pipefail

mkdir -p /home/operator
cd /home/operator

# Criar arquivo de dados de rede sem quebra de linha (23 bytes)
printf "AURA-NET-ACCESS-GRANTED" > dados_rede.txt

chown -R operator:operator /home/operator
