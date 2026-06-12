#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/verify_env.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não tem permissão de execução."
    exit 1
fi

# Resetar o diretório /mnt/backup antes de testar
rm -rf /mnt/backup

# Executar o script do usuário
"$SCRIPT_PATH" > /dev/null 2>&1 || {
    echo "Erro: O script verify_env.sh falhou ao ser executado."
    exit 1
}

# Verificar se /mnt/backup foi criado
if [ ! -d "/mnt/backup" ]; then
    echo "Erro: O diretório /mnt/backup não foi criado pelo script."
    exit 1
fi

# Verificar se tem permissão de escrita
if [ ! -w "/var/freshbox/current" ] && [ ! -d "/mnt/backup" ]; then
    echo "Erro: A verificação falhou."
    exit 1
fi

# Verificar se o script usa condicionais avançadas do bash
CONTENT=$(cat "$SCRIPT_PATH")
if [[ ! "$CONTENT" =~ "-f" ]] || [[ ! "$CONTENT" =~ "-d" ]]; then
    echo "Erro: O script deve conter verificações do bash como '-f' (arquivo) e '-d' (diretório)."
    exit 1
fi

echo "Sucesso: O script valida o ambiente e cria o diretório de backup corretamente!"
exit 0
