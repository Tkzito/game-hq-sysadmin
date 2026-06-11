#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/alertas.txt
Sensor de pressao de ar [OK]
Alerta: Sensor de temperatura [OK] falhou.
Sincronizacao da rede neural [OK]
Conexao estabelecida mas sem [OK] resposta
EOF
