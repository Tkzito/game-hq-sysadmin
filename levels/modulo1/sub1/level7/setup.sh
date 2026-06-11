#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 7
set -euo pipefail

mkdir -p /home/operator/legado

echo "FIRMWARE-DATA-1100101" > /home/operator/legado/firmware.bin
echo "Relatorio legado do sistema: status instavel." > /home/operator/legado/relatorio.txt

chown -R operator:operator /home/operator
