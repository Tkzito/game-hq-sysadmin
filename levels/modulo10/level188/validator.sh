#!/bin/bash
set -euo pipefail
if ! grep -qE 'create_before_destroy|depends_on' /home/operator/infra/*.tf; then echo 'Falha: Ciclo de vida e dependências de recursos não configuradas.'; exit 1; fi; echo 'Sucesso: Sequência lógica de deploys garantida!';
