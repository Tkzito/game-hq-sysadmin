#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 15
set -euo pipefail

mkdir -p /home/operator

# Criar arquivo base do ambiente
cat << 'EOF' > /home/operator/ambiente.sh
#!/bin/bash
# Preencha a linha abaixo substituindo os placeholders pelas variaveis de ambiente globais corretas ($USER e $HOME):
echo "Usuario: PLACEHOLDER_USER - Home: PLACEHOLDER_HOME"
EOF

chmod +x /home/operator/ambiente.sh
chown -R operator:operator /home/operator
