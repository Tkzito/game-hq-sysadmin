#!/bin/bash
# setup.sh - Nível 71
set -euo pipefail

# Criar script que gera dados
cat << 'EOF' > /home/operator/gerar_relatorio.sh
#!/bin/bash
echo "=== RELATÓRIO DO MÓDULO ANOMALO DE ENERGIA ==="
echo "Status: ESTÁVEL"
echo "Frequência: 60Hz"
echo "Carga: 42%"
EOF
chmod +x /home/operator/gerar_relatorio.sh
chown operator:operator /home/operator/gerar_relatorio.sh

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
