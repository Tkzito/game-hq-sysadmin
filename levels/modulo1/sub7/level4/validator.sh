#!/bin/bash
# Nao usar set -euo pipefail cru para testar variaveis de ambiente herdadas
# Para validar, precisamos inspecionar se o script exportou corretamente.
# Podemos dar source nele e ver se as variaveis aparecem.
SCRIPT="/home/operator/carregar_env.sh"
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: Arquivo nao encontrado."
    exit 1
fi
# Executar o source no escopo local do validador para testar
COMPARTIMENTO=""
STATUS_NUCLEO=""
source "$SCRIPT"
if [ "$COMPARTIMENTO" = "NUCLEO_PRINCIPAL" ] && [ "$STATUS_NUCLEO" = "ESTAVEL" ]; then
    echo "Sucesso: Script de exportacao de variaveis funcionando!"
    exit 0
else
    echo "Falha: Variaveis nao foram exportadas corretamente."
    exit 1
fi
