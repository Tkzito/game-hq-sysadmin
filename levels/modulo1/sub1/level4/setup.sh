#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 4
set -euo pipefail

# Limpar e garantir home limpo
rm -rf /home/operator/*
mkdir -p /home/operator
chown -R operator:operator /home/operator
