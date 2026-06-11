#!/bin/bash
# validator.sh - Nível 29
set -euo pipefail

# 1. Verificar se os arquivos .conf foram alterados para 600
for file in /home/operator/configs/db.conf /home/operator/configs/web.conf /home/operator/configs/nested/auth.conf; do
    if [ ! -f "$file" ]; then
        echo "Erro: O arquivo de configuração '$file' sumiu!"
        exit 1
    fi
    perm=$(stat -c "%a" "$file")
    if [ "$perm" != "600" ]; then
        echo "Erro: O arquivo '$file' ainda possui permissão $perm (esperado: 600)."
        exit 1
    fi
done

# 2. Verificar se o arquivo public.txt que não é .conf foi ignorado
if [ ! -f "/home/operator/configs/public.txt" ]; then
    echo "Erro: O arquivo public.txt foi removido!"
    exit 1
fi

perm_pub=$(stat -c "%a" "/home/operator/configs/public.txt")
if [ "$perm_pub" != "644" ]; then
    echo "Erro: O arquivo public.txt teve suas permissões modificadas incorretamente."
    exit 1
fi

echo "Parabéns! Você utilizou find com execução integrada para ajustar permissões de múltiplos arquivos de forma segura!"
exit 0
