#!/bin/bash
set -euo pipefail

RULES_FILE="/home/operator/.ufw_rules"

if [ ! -f "$RULES_FILE" ]; then
    echo "Erro: O firewall nao foi atualizado."
    exit 1
fi

# Verify if 203.0.113.199 is blocked
IS_BLOCKED=$(grep -F "203.0.113.199" "$RULES_FILE" || true)

if [ -n "$IS_BLOCKED" ]; then
    echo "Sucesso: O IP do botnet atacante (203.0.113.199) foi mitigado com sucesso!"
    exit 0
else
    echo "Erro: O IP correto do botnet nao foi bloqueado no firewall (use ufw deny para o IP correto identificado nos logs)."
    exit 1
fi
