#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 5
set -euo pipefail

mkdir -p /home/operator
cd /home/operator

# Gerar arquivo de log longo
for i in $(seq 1 100); do
    echo "2026-06-11 09:00:$i [INFO] Kern-01: Module $i status OK" >> sistema.log
done

echo "2026-06-11 09:02:15 [ERROR] AudioServer: Failed to map memory buffer. Error code: ERR-AUDIO-909" >> sistema.log
echo "2026-06-11 09:02:16 [WARN] System: Falling back to silent mode." >> sistema.log

chown -R operator:operator /home/operator
