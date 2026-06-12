#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/compress_logs.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não tem permissão de execução."
    exit 1
fi

# Executar o script do usuário para garantir que comprima os logs
# Como a validação pode ser executada várias vezes, verificamos se o resultado final foi atingido.
# Para isso, primeiro executamos o script:
"$SCRIPT_PATH" > /dev/null 2>&1 || true

# Verificar se os logs antigos agora estão como .gz
if [ ! -f "/var/log/freshbox/old1.log.gz" ] || [ ! -f "/var/log/freshbox/old2.log.gz" ]; then
    echo "Erro: Os logs antigos (/var/log/freshbox/old1.log e old2.log) não foram comprimidos para .gz."
    exit 1
fi

# Verificar se o log recente foi mantido sem compressão
if [ -f "/var/log/freshbox/new.log.gz" ]; then
    echo "Erro: O log recente (new.log) foi comprimido. Apenas logs com mais de 1 dia devem ser processados."
    exit 1
fi

echo "Sucesso: O script de compressão de logs antigos funciona corretamente!"
exit 0
