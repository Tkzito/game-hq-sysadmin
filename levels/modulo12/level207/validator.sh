#!/bin/bash
set -euo pipefail
if ! grep -qE 'cloudfront.*distribution' /home/operator/.bash_history; then echo 'Falha: CDN de distribuição global não configurada.'; exit 1; fi; echo 'Sucesso: Distribuição CloudFront activa!';
