#!/bin/bash
set -euo pipefail

# 1. Verifica se o log foi copiado localmente
if [ ! -f /home/operator/sync.log ]; then
    echo "Erro: O arquivo de log remoto /var/log/sync.log nao foi copiado para /home/operator/sync.log."
    exit 1
fi

CONTENT=$(cat /home/operator/sync.log | xargs)
if [ "$CONTENT" != "Erro de sincronizacao na filial Caruaru: porta 8443 bloqueada" ]; then
    echo "Erro: O conteudo do log copiado localmente nao e o esperado. Copie o arquivo da filial."
    exit 1
fi

# 2. Verifica se a pasta backup_scripts foi enviada para /tmp/backup_scripts
if [ ! -d /tmp/backup_scripts ]; then
    echo "Erro: O diretorio /home/operator/backup_scripts nao foi copiado para a filial (/tmp/backup_scripts)."
    exit 1
fi

if [ ! -f /tmp/backup_scripts/script1.sh ]; then
    echo "Erro: O arquivo script1.sh nao foi encontrado na pasta /tmp/backup_scripts/ da filial."
    exit 1
fi

echo "Sucesso: O arquivo de log foi copiado e os scripts de backup foram transferidos com sucesso!"
exit 0
