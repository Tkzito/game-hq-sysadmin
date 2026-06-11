#!/bin/bash
# setup.sh - Nível 73
set -euo pipefail

# Criar script que gera dados de stdout e stderr
cat << 'EOF' > /home/operator/backup.sh
#!/bin/bash
echo "Iniciando processo de backup de logs corporativos..."
echo "ALERTA: Espaço em disco reduzido na partição principal" >&2
echo "Finalizando cópia de segurança..."
EOF
chmod +x /home/operator/backup.sh
chown operator:operator /home/operator/backup.sh

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
