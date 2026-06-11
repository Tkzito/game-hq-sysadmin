#!/bin/bash
# validator.sh - Nível 22
set -euo pipefail

# 1. Verificar se a pasta logs existe
if [ ! -d "/home/operator/logs" ]; then
    echo "Erro: O diretório '/home/operator/logs' não foi criado."
    exit 1
fi

# 2. Verificar se arquivos de log foram movidos para lá
if [ ! -f "/home/operator/logs/auth_failure.log" ] || [ ! -f "/home/operator/logs/database_query.log" ]; then
    echo "Erro: Os arquivos .log não foram movidos para a pasta 'logs'."
    exit 1
fi

# 3. Verificar se foram removidos do diretório raiz
if [ -f "/home/operator/auth_failure.log" ] || [ -f "/home/operator/database_query.log" ]; then
    echo "Erro: Os arquivos .log originais ainda estão no diretório home."
    exit 1
fi

# 4. Verificar se config.old foi renomeado para config.cfg
if [ ! -f "/home/operator/config.cfg" ]; then
    echo "Erro: O arquivo 'config.old' não foi renomeado para 'config.cfg'."
    exit 1
fi

if [ -f "/home/operator/config.old" ]; then
    echo "Erro: O arquivo original 'config.old' ainda existe."
    exit 1
fi

# 5. Garantir que instructions.txt não foi alterado
if [ ! -f "/home/operator/instructions.txt" ]; then
    echo "Erro: O arquivo 'instructions.txt' sumiu ou foi modificado incorretamente."
    exit 1
fi

echo "Parabéns! Você organizou os arquivos corretamente movendo os logs e renomeando a configuração!"
exit 0
