#!/bin/bash
set -euo pipefail
if ! grep -qE 'limit_req_zone|limit_req' /etc/nginx/nginx.conf; then echo 'Falha: Limitação de taxa de requisições (rate limiting) não encontrada.'; exit 1; fi; echo 'Sucesso: Limitação de taxa ativa!';
