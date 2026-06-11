#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 13
set -euo pipefail

mkdir -p /home/operator

# Criar arquivo de base info.sh
cat << 'EOF' > /home/operator/info.sh
#!/bin/bash

# TODO: Declare as duas variaveis (NOME_IA e INTEGRIDADE) abaixo:



# Nao altere a linha de impressao abaixo:
echo "IA: $NOME_IA - Integridade: $INTEGRIDADE%"
EOF

chmod +x /home/operator/info.sh
chown -R operator:operator /home/operator
