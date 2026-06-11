#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/lib.sh
mensagem_sucesso() {
    echo "SISTEMA OPERACIONAL TOTALMENTE OPERACIONAL"
}
EOF
touch /home/operator/principal.sh
chmod +x /home/operator/principal.sh
