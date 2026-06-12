#!/bin/bash
set -euo pipefail

STATUS_FILE="/var/tmp/ufw_status.txt"
RULES_FILE="/var/tmp/ufw_rules.txt"

# 1. Verifica se o firewall foi configurado
if [ ! -f "$STATUS_FILE" ] || [ ! -f "$RULES_FILE" ]; then
    echo "Erro: O UFW nao foi configurado pelo jogador."
    exit 1
fi

STATUS=$(cat "$STATUS_FILE" | tr -d '[:space:]')

# 2. Verifica Lockout
if [ "$STATUS" = "lockout" ]; then
    echo "Erro: LOCKOUT DETECTADO! Voce ativou o firewall ('ufw enable') sem antes abrir a porta do SSH ('ufw allow 22/tcp'). Voce se trancou para fora do servidor! Reinicie o desafio e aplique as regras na ordem correta."
    exit 1
fi

# 3. Verifica se esta ativo
if [ "$STATUS" != "active" ]; then
    echo "Erro: O firewall nao esta ativo. Certifique-se de executar 'ufw enable'."
    exit 1
fi

# 4. Verifica as regras
if ! grep -q "22/tcp ALLOW" "$RULES_FILE"; then
    echo "Erro: A regra de permissao para a porta 22/tcp nao foi encontrada."
    exit 1
fi

if ! grep -q "80/tcp ALLOW" "$RULES_FILE"; then
    echo "Erro: A regra de permissao para a porta 80/tcp nao foi encontrada."
    exit 1
fi

if ! grep -q "3306/tcp DENY" "$RULES_FILE"; then
    echo "Erro: A regra de bloqueio explícito para a porta 3306/tcp nao foi encontrada."
    exit 1
fi

echo "Sucesso: Firewall configurado e ativado com as portas corretas, sem causar lockout!"
exit 0
