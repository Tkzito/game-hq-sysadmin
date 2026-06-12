#!/bin/bash
set -euo pipefail
if ! grep -q "%caixas" /etc/sudoers && ! grep -q "auxiliar" /etc/sudoers; then
    echo "Falha: Regras do grupo de caixas ou usuário auxiliar não encontradas no sudoers."
    exit 1
fi
visudo -c -f /etc/sudoers >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Falha: O arquivo sudoers possui erro de sintaxe."
    exit 1
fi
echo "Sucesso: Constituição de privilégios de segurança validada!"
exit 0
