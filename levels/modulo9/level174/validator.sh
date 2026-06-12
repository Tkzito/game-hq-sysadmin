#!/bin/bash
set -euo pipefail
if ! grep -qE 'expires|Cache-Control' /etc/nginx/nginx.conf; then echo 'Falha: Diretivas de expiração de cache não configuradas.'; exit 1; fi; echo 'Sucesso: Cache de arquivos estáticos configurado!';
