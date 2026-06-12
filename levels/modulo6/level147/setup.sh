#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Inicializar repositório local
mkdir -p /home/operator/api
cd /home/operator/api
rm -rf .git
git init

git config user.name "Operator"
git config user.email "operator@techvanguard.internal"

mkdir -p .git/hooks

chown -R operator:operator /home/operator
