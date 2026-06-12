#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Preparar o diretório da API
mkdir -p /home/operator/api
echo "console.log('API running');" > /home/operator/api/app.js

# Garantir que o repositório git não está pré-inicializado
rm -rf /home/operator/api/.git

# Limpar chaves globais do git para forçar o jogador a configurá-las
git config --global --unset-all user.name || true
git config --global --unset-all user.email || true

chown -R operator:operator /home/operator
