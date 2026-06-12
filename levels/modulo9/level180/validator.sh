#!/bin/bash
set -euo pipefail
if ! grep -qE 'proxy_pass' /etc/nginx/nginx.conf || ! grep -qE 'ssl_protocols' /etc/nginx/nginx.conf || ! grep -qE 'limit_req' /etc/nginx/nginx.conf; then echo 'Falha: O arquivo nginx.conf não atende de forma combinada aos critérios de proxy, SSL e rate limit.'; exit 1; fi; echo 'Sucesso: Gateway de Nginx de produção blindado com sucesso!';
