#!/bin/bash
set -euo pipefail
if ! grep -qE 'variable ' /home/operator/infra/*.tf || ! grep -qE 'output ' /home/operator/infra/*.tf; then echo 'Falha: Defina variáveis de entrada e outputs dinâmicos.'; exit 1; fi; echo 'Sucesso: Parâmetros declarados com flexibilidade!';
