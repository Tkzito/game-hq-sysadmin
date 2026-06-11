#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 11
set -euo pipefail

mkdir -p /home/operator

# Criar script sem shebang e sem permissão de execução
cat << 'EOF' > /home/operator/diagnostico.sh
# Este script faz o diagnostico da AURA
echo "AURA STATUS: EXCELENTE"
EOF

chmod 644 /home/operator/diagnostico.sh
chown -R operator:operator /home/operator
