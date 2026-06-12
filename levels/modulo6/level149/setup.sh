#!/bin/bash
set -euo pipefail

# Pacotes necessários já instalados no Dockerfile

mkdir -p /home/operator/api
cd /home/operator/api

# Criar deploy.yml com erros de indentação para o jogador corrigir
cat << 'EOF' > deploy.yml
version: "3"
services:
  api:
    image: techvanguard/api:latest
   ports:
      - "8080:8080"
EOF

chown -R operator:operator /home/operator
