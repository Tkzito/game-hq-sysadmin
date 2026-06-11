#!/bin/bash
# validator.sh - Nível 23
set -euo pipefail

# 1. Verificar se arquivos importantes foram mantidos
if [ ! -f "/home/operator/temp_files/do_not_delete_database.db" ]; then
    echo "Erro: Você deletou o banco de dados importante 'do_not_delete_database.db'!"
    exit 1
fi

if [ ! -f "/home/operator/temp_files/nested_temp/keep_this_too.key" ]; then
    echo "Erro: Você deletou o arquivo chave crucial 'keep_this_too.key'!"
    exit 1
fi

# 2. Verificar se arquivos temporários foram excluídos
if [ -f "/home/operator/temp_files/temp_cache_1.tmp" ] || \
   [ -f "/home/operator/temp_files/temp_cache_2.tmp" ] || \
   [ -f "/home/operator/temp_files/nested_temp/nested_cache.tmp" ]; then
    echo "Erro: Ainda existem arquivos temporários (.tmp) sob o diretório temp_files/."
    exit 1
fi

echo "Parabéns! Você removeu com segurança apenas os arquivos temporários indesejados, protegendo os dados essenciais!"
exit 0
