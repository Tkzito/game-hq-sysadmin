#!/bin/bash
set -euo pipefail
if ! grep -qE 'backend "s3"' /home/operator/infra/*.tf; then echo 'Falha: O backend s3 remoto não foi configurado.'; exit 1; fi; echo 'Sucesso: Estado salvo de forma descentralizada!';
