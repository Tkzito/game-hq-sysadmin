#!/bin/bash
# validator.sh - Verifica se o jogador deletou o arquivo e pasta corretos.
set -euo pipefail

# 1. Verificar se cache.tmp foi removido
if [ -f "/home/operator/cache.tmp" ]; then
    echo "Falha: O arquivo cache.tmp ainda existe."
    exit 1
fi

# 2. Verificar se cache_velho foi removido
if [ -d "/home/operator/cache_velho" ]; then
    echo "Falha: O diretório cache_velho (e seus arquivos internos) ainda existe."
    exit 1
fi

echo "Sucesso: Lixo eletrônico removido e espaço liberado!"
exit 0
