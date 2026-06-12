#!/bin/bash
set -euo pipefail
if ! id -u auxiliar >/dev/null 2>&1; then
    echo "Falha: O usuário 'auxiliar' ainda não foi criado."
    exit 1
fi
if ! grep -q "adduser" /home/operator/.bash_history && ! grep -q "useradd" /home/operator/.bash_history; then
    echo "Falha: O usuário auxiliar foi criado mas não detectamos o uso do adduser/useradd no histórico."
    exit 1
fi
echo "Sucesso: Novo operador 'auxiliar' registrado no sistema!"
exit 0
