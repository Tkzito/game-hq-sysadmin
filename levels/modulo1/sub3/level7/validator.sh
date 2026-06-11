#!/bin/bash
# validator.sh - Nível 27
set -euo pipefail

CAMINHO_FILE="/home/operator/caminho_chave.txt"

# 1. Verificar se o arquivo foi criado
if [ ! -f "$CAMINHO_FILE" ]; then
    echo "Erro: O arquivo '$CAMINHO_FILE' contendo o caminho da chave não foi criado."
    exit 1
fi

# 2. Validar conteúdo
conteudo=$(tr -d '[:space:]' < "$CAMINHO_FILE")
esperado="/home/operator/sistema/core/seguranca/chaves/aura_private_key.pem"

if [ "$conteudo" != "$esperado" ]; then
    echo "Erro: O caminho da chave especificado em '$CAMINHO_FILE' está incorreto ou incompleto."
    exit 1
fi

echo "Parabéns! Você usou find para varrer a árvore de diretórios e localizar a chave secreta com sucesso!"
exit 0
