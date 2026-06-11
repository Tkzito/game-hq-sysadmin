#!/bin/bash
# setup.sh - Nível 37
set -euo pipefail

cat << 'EOF' > /home/operator/check_ports.sh
#!/bin/bash
# Script de varredura de portas locais

# BUG: A equipe quer que todas as saídas de erro (stderr) enviadas por este script
# vão parar automaticamente no arquivo /home/operator/error.log.
# Atualmente, os avisos e erros estão sendo exibidos diretamente na tela do operador, poluindo o console.
#
# Adicione uma instrução para redirecionar o descritor stderr (2) para /home/operator/error.log.
# DICA: colocar 'exec 2> /home/operator/error.log' no início do script resolve para todo o fluxo!

echo "Iniciando varredura..."
echo "[AVISO] Porta 22 com conexão instável" >&2
echo "Porta 80: Aberta"
echo "[ERRO] Porta 443 recusou a conexão" >&2
echo "Porta 8080: Aberta"
EOF

chmod +x /home/operator/check_ports.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
