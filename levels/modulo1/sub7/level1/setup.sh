#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/nomes.txt
AURA
Helena
Arthur
EOF
touch /home/operator/ler_linhas.sh
chmod +x /home/operator/ler_linhas.sh
