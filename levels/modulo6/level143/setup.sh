#!/bin/bash
set -euo pipefail

# Configurar branch padrão para evitar problemas caso o padrão do sistema seja main
git config --system init.defaultBranch master || true

# Inicializar repositório para o jogador
mkdir -p /home/operator/api
cd /home/operator/api

if [ ! -d .git ]; then
    git init
fi

git config user.name "Operator"
git config user.email "operator@techvanguard.internal"

echo "const express = require('express');" > app.js
git add app.js
git commit -m "feat: setup inicial" || true

# Garantir que estamos na master e apagar branches antigas caso o jogador esteja resetando
git checkout master || git checkout -b master || true
git branch -D feature/taxas-api || true

chown -R operator:operator /home/operator
