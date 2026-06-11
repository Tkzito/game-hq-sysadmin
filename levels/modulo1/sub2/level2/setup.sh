#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 12
set -euo pipefail

mkdir -p /home/operator

# Criar script limpo sem documentação
cat << 'EOF' > /home/operator/limpar_logs.sh
#!/bin/bash

rm -f /home/operator/temp_*.log
echo "Logs limpos!"
EOF

chmod +x /home/operator/limpar_logs.sh
chown -R operator:operator /home/operator
