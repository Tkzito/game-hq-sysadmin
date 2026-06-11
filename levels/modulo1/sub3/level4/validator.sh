#!/bin/bash
# validator.sh - Nível 24
set -euo pipefail

TARBALL="/home/operator/evidencias.tar.gz"

# 1. Verificar se o arquivo compactado existe
if [ ! -f "$TARBALL" ]; then
    echo "Erro: O arquivo compactado '$TARBALL' não foi encontrado."
    exit 1
fi

# 2. Verificar se é um arquivo tar/gzip válido e ler conteúdo
if ! tar -tzf "$TARBALL" > /dev/null 2>&1; then
    echo "Erro: O arquivo '$TARBALL' não é um arquivo .tar.gz válido (gzip corrompido ou formato incorreto)."
    exit 1
fi

# 3. Verificar se os arquivos corretos estão contidos no tar
content=$(tar -tzf "$TARBALL")

if ! echo "$content" | grep -q "suspect_ips.txt"; then
    echo "Erro: O arquivo 'suspect_ips.txt' não está contido no tarball."
    exit 1
fi

if ! echo "$content" | grep -q "malicious_payload.bin"; then
    echo "Erro: O arquivo 'malicious_payload.bin' não está contido no tarball."
    exit 1
fi

if ! echo "$content" | grep -q "access_logs_compromised.log"; then
    echo "Erro: O arquivo 'access_logs_compromised.log' não está contido no tarball."
    exit 1
fi

echo "Parabéns! Você compactou as evidências com segurança em um arquivo .tar.gz estruturado!"
exit 0
