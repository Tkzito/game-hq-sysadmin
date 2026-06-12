#!/bin/bash
set -euo pipefail

SSH_CONFIG="/home/operator/.ssh/config"
AUTH_KEYS="/home/operator/.ssh/authorized_keys"

# 1. Verifica se o arquivo de configuracao existe
if [ ! -f "$SSH_CONFIG" ]; then
    echo "Erro: O arquivo de configuracao SSH em ~/.ssh/config nao foi encontrado."
    exit 1
fi

# 2. Verifica as regras dentro do ~/.ssh/config
if ! grep -qi "Host[[:space:]]\+filial" "$SSH_CONFIG"; then
    echo "Erro: O Host 'filial' nao foi definido em ~/.ssh/config."
    exit 1
fi

if ! grep -qi "Port[[:space:]]\+2222" "$SSH_CONFIG"; then
    echo "Erro: A porta '2222' nao foi especificada no Host filial em ~/.ssh/config."
    exit 1
fi

if ! grep -qE "HostName[[:space:]]+(localhost|127\.0\.0\.1)" "$SSH_CONFIG"; then
    echo "Erro: O HostName para filial deve ser 'localhost' ou '127.0.0.1'."
    exit 1
fi

# 3. Verifica se a chave publica do operator foi copiada para authorized_keys
if [ ! -f "$AUTH_KEYS" ] || [ ! -s "$AUTH_KEYS" ]; then
    echo "Erro: Nenhuma chave publica foi copiada para ~/.ssh/authorized_keys. Lembre-se de rodar 'ssh-copy-id -p 2222 operator@localhost'."
    exit 1
fi

echo "Sucesso: O atalho 'filial' foi configurado no ~/.ssh/config e as chaves SSH foram copiadas com sucesso!"
exit 0
