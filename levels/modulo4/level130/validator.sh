#!/bin/bash
set -euo pipefail

RULES_FILE="/var/tmp/ufw_rules.txt"
HEALTH_FILE="/home/operator/health_response.json"

# 1. Verifica a entrada no /etc/hosts
if ! grep -qE "192\.168\.2\.100[[:space:]]+filial-caruaru\.saoluis\.local" /etc/hosts; then
    echo "Erro: A entrada associando 192.168.2.100 a filial-caruaru.saoluis.local nao foi encontrada em /etc/hosts."
    exit 1
fi

# 2. Verifica se a porta 8443 foi aberta no firewall
if [ ! -f "$RULES_FILE" ] || ! grep -qE "(8443/tcp ALLOW|8443 ALLOW)" "$RULES_FILE"; then
    echo "Erro: O trafego na porta 8443/tcp nao foi liberado no firewall da filial (UFW)."
    exit 1
fi

# 3. Verifica se a resposta da API foi salva localmente
if [ ! -f "$HEALTH_FILE" ]; then
    echo "Erro: O arquivo de resposta /home/operator/health_response.json nao foi criado."
    exit 1
fi

CONTENT=$(cat "$HEALTH_FILE" | tr -d '[:space:]')
if [ "$CONTENT" != '{"status":"healthy"}' ]; then
    echo "Erro: O conteudo de /home/operator/health_response.json nao e o JSON esperado da API de sincronizacao."
    exit 1
fi

echo "Sucesso: Conectividade com a filial Caruaru restaurada e verificada com sucesso!"
exit 0
