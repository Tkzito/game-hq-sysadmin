#!/bin/bash
# validator.sh - Nível 38
set -euo pipefail

# 1. Verificar se o processo solar_leak.sh ainda está ativo
if ps aux | grep -v grep | grep -q "solar_leak.sh"; then
    echo "Erro: O processo conflitante 'solar_leak.sh' ainda está em execução."
    exit 1
fi

# 2. Verificar se o deploy.sh foi executado após matar o processo
if [ ! -f "/home/operator/deploy_status.txt" ]; then
    echo "Erro: O arquivo '/home/operator/deploy_status.txt' não foi gerado. Você executou o script './deploy.sh' após parar o processo fantasma?"
    exit 1
fi

# 3. Validar o conteúdo do status de deploy
status=$(cat /home/operator/deploy_status.txt)
if [ "$status" != "DEPLOY_STATUS=OK" ]; then
    echo "Erro: O status do deploy em '/home/operator/deploy_status.txt' está inválido."
    exit 1
fi

echo "Parabéns! Você identificou o processo concorrente, encerrou-o com kill e executou o deploy com sucesso!"
exit 0
