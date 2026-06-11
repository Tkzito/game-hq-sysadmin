#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/sensores.txt
Setor A1 online
Setor Z9 offline
Setor F5 atencao
Setor B6 temperatura normal
Setor D3 vazamento detectado
EOF
