#!/bin/bash
set -euo pipefail
if ! grep -qE 'ssl_protocols.*TLSv1.3' /etc/nginx/nginx.conf; then echo 'Falha: Protocolo TLSv1.3 seguro não habilitado.'; exit 1; fi; echo 'Sucesso: Cifras de segurança criptográfica TLS 1.3 ativadas!';
