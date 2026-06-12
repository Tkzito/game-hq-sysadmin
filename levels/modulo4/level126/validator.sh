#!/bin/bash
set -euo pipefail

# 1. Verifica se o diagnostico.sh foi baixado
if [ ! -f /home/operator/diagnostico.sh ]; then
    echo "Erro: O arquivo /home/operator/diagnostico.sh nao foi baixado."
    exit 1
fi

# 2. Verifica se o health.json foi criado
if [ ! -f /home/operator/health.json ]; then
    echo "Erro: O arquivo /home/operator/health.json nao foi criado."
    exit 1
fi

CONTENT=$(cat /home/operator/health.json | tr -d '[:space:]')

if [ "$CONTENT" != '{"status":"healthy"}' ]; then
    echo "Erro: O conteudo de /home/operator/health.json nao corresponde a resposta esperada da API."
    exit 1
fi

echo "Sucesso: Voce baixou o script de diagnostico e consumiu o endpoint de saúde com sucesso!"
exit 0
