#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 14
set -euo pipefail

mkdir -p /home/operator

# Criar script com bug de aspas simples
cat << 'EOF' > /home/operator/mensagem.sh
#!/bin/bash
STATUS="ESTÁVEL"
# Conserte a linha abaixo para usar aspas duplas, permitindo interpolar a variavel:
echo 'AURA STATUS: $STATUS'
EOF

chmod +x /home/operator/mensagem.sh
chown -R operator:operator /home/operator
