#!/bin/bash
set -euo pipefail
if ! grep -qE 'upstream' /etc/nginx/nginx.conf; then echo 'Falha: Bloco upstream de balanceamento de carga não encontrado.'; exit 1; fi; echo 'Sucesso: Upstream de balanceamento de carga ativo!';
