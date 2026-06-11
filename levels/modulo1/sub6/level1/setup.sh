#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/logs.txt
ERROR: Falha de ignicao no nucleo.
WARN: Temperatura acima do normal.
ERROR: Vazamento de fluido hidraulico.
INFO: Ciclo de refrigeracao completo.
DEBUG: ERROR: Tentativa de login ignorada.
EOF
