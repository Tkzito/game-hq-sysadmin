#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 16
set -euo pipefail

mkdir -p /home/operator

# Criar arquivo base valida_ip.sh
cat << 'EOF' > /home/operator/valida_ip.sh
#!/bin/bash
IP=""

# TODO: Implemente a condicional que checa se a variavel IP esta vazia (-z).
# Se estiver vazia, imprima "IP invalido" e saia do script com exit 1.
# Dica de sintaxe:
# if [ -z "$IP" ]; then
#     echo "IP invalido"
#     exit 1
# fi



echo "Conectando ao IP: $IP"
EOF

chmod +x /home/operator/valida_ip.sh
chown -R operator:operator /home/operator
