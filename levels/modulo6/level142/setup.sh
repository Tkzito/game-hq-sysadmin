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

# Configurar identidade localmente no repositório para não forçar global
git config user.name "Operator"
git config user.email "operator@techvanguard.internal"

# Criar os arquivos que precisam ser comitados
echo "const express = require('express');" > app.js
echo "PORT=8080" > config.env

chown -R operator:operator /home/operator
