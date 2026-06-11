#!/bin/bash
# validator.sh - Nível 30
set -euo pipefail

TARBALL="/home/operator/backup_hacker.tar.gz"

# 1. Verificar se o arquivo compactado existe
if [ ! -f "$TARBALL" ]; then
    echo "Erro: O arquivo compactado '$TARBALL' não foi gerado."
    exit 1
fi

# 2. Verificar integridade do tarball
if ! tar -tzf "$TARBALL" > /dev/null 2>&1; then
    echo "Erro: O arquivo '$TARBALL' está corrompido ou não está no formato tar.gz."
    exit 1
fi

# 3. Verificar se os arquivos .bak estão dentro do tarball
tar_content=$(tar -tzf "$TARBALL")
if ! echo "$tar_content" | grep -q "hacker_log.bak" || ! echo "$tar_content" | grep -q "secret_leak.bak"; then
    echo "Erro: Os arquivos .bak corretos não foram arquivados dentro do tarball."
    exit 1
fi

# 4. Verificar se os arquivos originais .bak foram apagados do disco
if [ -f "/home/operator/sistema/hacker_log.bak" ] || [ -f "/home/operator/sistema/nested/secret_leak.bak" ]; then
    echo "Erro: Os arquivos .bak originais ainda existem no diretório do sistema."
    exit 1
fi

# 5. Garantir que os arquivos legítimos não foram apagados
if [ ! -f "/home/operator/sistema/app.conf" ] || [ ! -f "/home/operator/sistema/nested/clean.log" ]; then
    echo "Erro: Você apagou arquivos legítimos do sistema durante a limpeza!"
    exit 1
fi

echo "Parabéns! Você buscou, arquivou e removeu com segurança os arquivos residuais do hacker!"
exit 0
