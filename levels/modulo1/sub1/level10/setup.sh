#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 10
set -euo pipefail

mkdir -p /home/operator/sistema_antigo

echo "[PAINEL_AURA]" > /home/operator/sistema_antigo/parte1.txt
echo "status_modulos=online" > /home/operator/sistema_antigo/parte2.txt

chown -R operator:operator /home/operator
