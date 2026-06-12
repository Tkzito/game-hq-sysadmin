#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Criar repositório local bare (servidor de custódia simulado)
mkdir -p /var/git/api.git
rm -rf /var/git/api.git/*
git init --bare /var/git/api.git
chmod -R 777 /var/git/api.git

# Configurar o redirecionamento global de URL do git
git config --system url."/var/git/api.git".insteadOf "git@github.com:techvanguard/api.git"

# Inicializar repositório local do operator
mkdir -p /home/operator/api
cd /home/operator/api
rm -rf .git
git init
git config user.name "Operator"
git config user.email "operator@techvanguard.internal"

echo "PORT=9000" > app.conf
git add app.conf
git commit -m "feat: config inicial da API"

chown -R operator:operator /home/operator
chown -R operator:operator /var/git/api.git
