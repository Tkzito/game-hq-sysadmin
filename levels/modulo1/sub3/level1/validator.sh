#!/bin/bash
# validator.sh - Nível 21
set -euo pipefail

BACKUP_DIR="/home/operator/dados_backup"
ORIGINAL_DIR="/home/operator/dados_originais"

# 1. Verificar se a pasta de backup existe
if [ ! -d "$BACKUP_DIR" ]; then
    echo "Erro: O diretório '$BACKUP_DIR' não foi criado."
    exit 1
fi

# 2. Verificar se os arquivos estão lá
for file in sistema.conf chave_acesso.key; do
    if [ ! -f "$BACKUP_DIR/$file" ]; then
        echo "Erro: O arquivo '$file' não foi encontrado no backup."
        exit 1
    fi
done

# 3. Verificar permissões (devem ser idênticas)
perm_orig_conf=$(stat -c "%a" "$ORIGINAL_DIR/sistema.conf")
perm_back_conf=$(stat -c "%a" "$BACKUP_DIR/sistema.conf")

perm_orig_key=$(stat -c "%a" "$ORIGINAL_DIR/chave_acesso.key")
perm_back_key=$(stat -c "%a" "$BACKUP_DIR/chave_acesso.key")

if [ "$perm_orig_conf" != "$perm_back_conf" ] || [ "$perm_orig_key" != "$perm_back_key" ]; then
    echo "Erro: As permissões dos arquivos copiados não foram preservadas."
    exit 1
fi

# 4. Verificar data de modificação (timestamps devem ser idênticos)
time_orig_conf=$(stat -c "%Y" "$ORIGINAL_DIR/sistema.conf")
time_back_conf=$(stat -c "%Y" "$BACKUP_DIR/sistema.conf")

if [ "$time_orig_conf" != "$time_back_conf" ]; then
    echo "Erro: Os timestamps (datas de modificação) dos arquivos não foram preservados. Use a flag correta para preservar atributos."
    exit 1
fi

echo "Parabéns! Você realizou o backup completo preservando todos os atributos originais dos arquivos críticos!"
exit 0
