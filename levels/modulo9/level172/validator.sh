#!/bin/bash
set -euo pipefail
if ! grep -qE 'proxy_pass' /etc/nginx/conf.d/default.conf && ! grep -qE 'proxy_pass' /etc/nginx/nginx.conf; then echo 'Falha: Você precisa configurar o redirecionamento proxy_pass para a API.'; exit 1; fi; echo 'Sucesso: Proxy reverso configurado com sucesso!';
