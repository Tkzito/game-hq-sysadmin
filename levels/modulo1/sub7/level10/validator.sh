#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/configurar_dashboard.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
# Testar sucesso
OUT1=$("$SCRIPT")
if [ "$OUT1" != "Painel: AURA-Console | Porta: 9000" ]; then
    echo "Falha no teste com configuracoes corretas: '$OUT1'"
    exit 1
fi
# Testar falha de variavel ausente
cat << 'EOF' > /home/operator/.dashboard.env
DASHBOARD_PORT=9000
EOF
set +e
OUT2=$("$SCRIPT" 2>&1)
CODE2=$?
set -e
if [ "$CODE2" -ne 1 ] || [ "$OUT2" != "Erro de Inicializacao" ]; then
    echo "Falha ao rejeitar dashboard sem nome: '$OUT2' (exit $CODE2)"
    exit 1
fi
# Restaurar setup original
cat << 'EOF' > /home/operator/.dashboard.env
# Dashboard config
DASHBOARD_NAME=AURA-Console
DASHBOARD_PORT=9000
EOF
echo "Sucesso: O configurador do dashboard foi validado com todas as regras de escopo e parser!"
exit 0
