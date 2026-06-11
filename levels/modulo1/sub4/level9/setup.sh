#!/bin/bash
# setup.sh - Nível 39
set -euo pipefail

cat << 'EOF' > /home/operator/monitor.sh
#!/bin/bash
# Script de monitoramento de memória com suporte a verbose/debug

# BUG/TODO: O script deve entrar em modo DEBUG se o primeiro argumento ($1) for "-d"
# OU se a variável de ambiente DEBUG estiver definida como "1".
# Complete a verificação abaixo para definir a variável DEBUG_MODE como 1 quando uma das condições acima for atendida.

DEBUG_MODE=0

# Escreva a lógica aqui:
# DICA: if [ "${1:-}" = "-d" ] || [ "${DEBUG:-}" = "1" ]; then DEBUG_MODE=1; fi


# Fluxo de exibição baseado na variável DEBUG_MODE
if [ "$DEBUG_MODE" -eq 1 ]; then
    echo "DEBUG: Modo verboso ativo"
    echo "DEBUG: Limite de memoria configurado para 90%"
fi

echo "STATUS MEMORIA: OK"
EOF

chmod +x /home/operator/monitor.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
