#!/bin/bash
set -euo pipefail
if ! grep -qE 'loki|clients:' /etc/promtail/promtail.yml; then echo 'Falha: Configuração de clientes Loki ausente no Promtail.'; exit 1; fi; echo 'Sucesso: Envio centralizado de logs via Loki ativo!';
