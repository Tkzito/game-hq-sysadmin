#!/bin/bash
# validator.sh - Verifica se a estrutura de pastas e o arquivo foram criados.
set -euo pipefail

if [ ! -d "/home/operator/sistema/config" ]; then
    echo "Falha: O diretório 'sistema/config' não existe."
    exit 1
fi

if [ ! -d "/home/operator/sistema/scripts" ]; then
    echo "Falha: O diretório 'sistema/scripts' não existe."
    exit 1
fi

if [ ! -f "/home/operator/sistema/config/aura.conf" ]; then
    echo "Falha: O arquivo 'sistema/config/aura.conf' não foi criado."
    exit 1
fi

echo "Sucesso: Estrutura de diretórios criada e inicializada com perfeição!"
exit 0
