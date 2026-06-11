#!/bin/bash
# setup.sh - Nível 28
set -euo pipefail

mkdir -p /home/operator/logs

# Criar arquivos normais
echo "small log content" > /home/operator/logs/small_log_1.log
echo "another small log content" > /home/operator/logs/small_log_2.log

# Criar o arquivo gigante usando truncate para não desperdiçar espaço físico real do Git, mas registrando 12MB de tamanho lógico
truncate -s 12M /home/operator/logs/system_dump_corrupt.log

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
