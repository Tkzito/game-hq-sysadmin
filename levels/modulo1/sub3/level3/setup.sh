#!/bin/bash
# setup.sh - Nível 23
set -euo pipefail

mkdir -p /home/operator/temp_files/nested_temp

# Arquivos temporários a serem deletados
echo "lixo1" > /home/operator/temp_files/temp_cache_1.tmp
echo "lixo2" > /home/operator/temp_files/temp_cache_2.tmp
echo "lixo3" > /home/operator/temp_files/nested_temp/nested_cache.tmp

# Arquivos importantes que DEVEM ser mantidos
echo "dados cruciais" > /home/operator/temp_files/do_not_delete_database.db
echo "chave_acesso" > /home/operator/temp_files/nested_temp/keep_this_too.key

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
