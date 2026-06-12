#!/bin/bash
set -euo pipefail
if [ $(grep -c 'server_name' /etc/nginx/nginx.conf) -lt 2 ]; then echo 'Falha: Configure blocos server blocks separados para api e app.'; exit 1; fi; echo 'Sucesso: Virtual Hosts múltiplos operando na mesma porta!';
