#!/bin/bash
set -euo pipefail
if ! grep -qE 'X-Frame-Options|Strict-Transport-Security' /etc/nginx/nginx.conf; then echo 'Falha: Cabeçalhos de segurança HTTP ausentes.'; exit 1; fi; echo 'Sucesso: Headers de segurança aplicados com sucesso!';
