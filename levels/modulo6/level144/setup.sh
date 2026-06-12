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

echo "const express = require('express');" > app.js
git add app.js
git commit -m "feat: setup inicial"

# Criar a branch de feature e comitar mudanças
git checkout -b feature/taxas-api
echo "const TAX_RATE = 0.05;" >> app.js
git add app.js
git commit -m "feat: adiciona taxa de transação"

chown -R operator:operator /home/operator
