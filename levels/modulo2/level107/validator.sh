#!/bin/bash
set -euo pipefail
if ! id -Gn auxiliar | grep -q "\blp\b"; then
    echo "Falha: O usuário 'auxiliar' não pertence ao grupo 'lp'."
    exit 1
fi
echo "Sucesso: Auxiliar agora tem acesso à impressora fiscal!"
exit 0
