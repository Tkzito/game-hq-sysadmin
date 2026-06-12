#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Inicializar repositório limpo
mkdir -p /home/operator/api
cd /home/operator/api
rm -rf .git

git init
git config user.name "Operator"
git config user.email "operator@techvanguard.internal"

# Commit base
echo "PORT=8080" > app.conf
git add app.conf
git commit -m "feat: adiciona config inicial"

# Modificação na branch
git checkout -b feature/porta-dev
echo "PORT=8888" > app.conf
git add app.conf
git commit -m "feat: altera porta para ambiente de dev"

# Modificação na master
git checkout master
echo "PORT=9000" > app.conf
git add app.conf
git commit -m "feat: altera porta para producao"

# Forçar o conflito de merge (ignora falha intencional do git merge)
git merge feature/porta-dev || true

chown -R operator:operator /home/operator
