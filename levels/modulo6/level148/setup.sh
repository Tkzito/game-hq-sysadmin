#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Criar pasta de deploy
mkdir -p /var/www/html
chmod 777 /var/www/html

# Criar repositório bare remoto
mkdir -p /var/git/api.git
cd /var/git/api.git
git init --bare
mkdir -p hooks
chmod -R 777 /var/git/api.git

# Inicializar repositório local
mkdir -p /home/operator/api
cd /home/operator/api
rm -rf .git
git init
git config user.name "Operator"
git config user.email "operator@techvanguard.internal"
git remote add origin /var/git/api.git

echo "<h1>API de Pagamentos</h1>" > index.html
git add index.html
git commit -m "initial commit"

chown -R operator:operator /home/operator
chown -R operator:operator /var/git/api.git
chown -R operator:operator /var/www/html
