#!/bin/bash
# setup.sh - Nível 32
set -euo pipefail

cat << 'EOF' > /home/operator/sync.sh
#!/bin/bash
# Script de sincronizacao de dados da estação solar

# Status simulado de conectividade (1 = Online, 0 = Offline)
CONN_STATUS=1

# BUG: A verificação de conectividade está com a lógica invertida!
# Se o status for 1 (Online), ele cai no bloco do else e reporta erro de conexão.
if [ "$CONN_STATUS" -eq 0 ]; then
    echo "Status de conexão OK. Sincronizando logs..."
else
    echo "Erro: Servidor de logs offline!"
fi
EOF

chmod +x /home/operator/sync.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
