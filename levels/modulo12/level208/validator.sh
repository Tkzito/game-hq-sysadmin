#!/bin/bash
set -euo pipefail
if ! grep -qE 'route53' /home/operator/.bash_history; then echo 'Falha: Registros ou rotas de DNS Route 53 não configurados.'; exit 1; fi; echo 'Sucesso: Roteamento geográfico ativo!';
