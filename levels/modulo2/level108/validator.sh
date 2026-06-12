#!/bin/bash
set -euo pipefail
if ! grep -q "su " /home/operator/.bash_history && ! grep -q "su\b" /home/operator/.bash_history; then
    echo "Falha: Você precisa trocar de identidade no terminal usando 'su'."
    exit 1
fi
echo "Sucesso: Mudança de perspectiva testada!"
exit 0
