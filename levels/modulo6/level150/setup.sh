#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Criar diretório de deploy
mkdir -p /var/www/html
chmod 777 /var/www/html

# Criar repositório bare remoto
mkdir -p /var/git/api.git
git init --bare /var/git/api.git
chmod -R 777 /var/git/api.git

# Inicializar repositório local do operator
mkdir -p /home/operator/api
cd /home/operator/api
rm -rf .git
git init
git config user.name "Operator"
git config user.email "operator@techvanguard.internal"
git remote add origin /var/git/api.git

# Primeiro commit base
echo "PORT=8080" > app.conf
echo "version: 1.0" > deploy.yml
git add app.conf deploy.yml
git commit -m "initial commit"

# Criar branch feature
git checkout -b feature/taxas-api
echo "PORT=8888" > app.conf
git add app.conf
git commit -m "change port on feature"

# Modificação na master
git checkout master
echo "PORT=9000" > app.conf
git add app.conf
git commit -m "change port on master"

# Forçar conflito de merge (ignora falha intencional do git merge)
git merge feature/taxas-api || true

chown -R operator:operator /home/operator
chown -R operator:operator /var/git/api.git
chown -R operator:operator /var/www/html
