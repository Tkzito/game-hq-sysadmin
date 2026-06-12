#!/bin/bash
set -euo pipefail
# Garantir que o usuario nao exista no inicio da fase
if id -u auxiliar >/dev/null 2>&1; then
    userdel -r auxiliar || true
fi
