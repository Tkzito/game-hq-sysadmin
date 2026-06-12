#!/bin/bash
set -euo pipefail

AUTH_KEYS="/home/operator/.ssh/authorized_keys"

if [ ! -f "$AUTH_KEYS" ]; then
    echo "Erro: O arquivo '.ssh/authorized_keys' nao existe ou foi removido totalmente."
    exit 1
fi

# Check if obsolete key is still present
HAS_OBSOLETE=$(grep -F "admin@janelaos.com" "$AUTH_KEYS" || true)

# Check if legitimate key is still present
HAS_LEGITIMATE=$(grep -F "operator@ecogrid-solar.org" "$AUTH_KEYS" || true)

if [ -z "$HAS_OBSOLETE" ] && [ -n "$HAS_LEGITIMATE" ]; then
    echo "Sucesso: Chave obsoleta removida e chave legitima preservada!"
    exit 0
else
    if [ -n "$HAS_OBSOLETE" ]; then
        echo "Erro: A chave do tecnico antigo (admin@janelaos.com) ainda esta autorizada."
    else
        echo "Erro: A chave legitima do Consorcio (operator@ecogrid-solar.org) foi removida por engano."
    fi
    exit 1
fi
