#!/bin/bash
# setup.sh - Nível 72
set -euo pipefail

# Criar script que gera dados de erro
cat << 'EOF' > /home/operator/testar_conexao.sh
#!/bin/bash
echo "Pingando gateway principal..."
echo "ALERTA: Gateway 10.0.0.1 offline ou inacessível" >&2
echo "Conexão de teste finalizada."
EOF
chmod +x /home/operator/testar_conexao.sh
chown operator:operator /home/operator/testar_conexao.sh

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
