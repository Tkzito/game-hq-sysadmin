#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Erro: O repositório Git não foi inicializado em $REPO_DIR."
    exit 1
fi

# Verificar configurações de identidade
USER_NAME=$(sudo -u operator git -C "$REPO_DIR" config user.name || echo "")
USER_EMAIL=$(sudo -u operator git -C "$REPO_DIR" config user.email || echo "")

if [ -z "$USER_NAME" ]; then
    echo "Erro: O nome de usuário do Git (user.name) não está configurado."
    exit 1
fi

if [ -z "$USER_EMAIL" ]; then
    echo "Erro: O e-mail do Git (user.email) não está configurado."
    exit 1
fi

echo "Sucesso: O repositório Git foi inicializado e a identidade configurada!"
exit 0
