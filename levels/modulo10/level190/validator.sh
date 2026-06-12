#!/bin/bash
set -euo pipefail
if ! grep -qE 'module "vpc"' /home/operator/infra/*.tf || ! grep -qE 'backend "s3"' /home/operator/infra/*.tf; then echo 'Falha: O arquivo principal não atende às diretrizes combinadas de módulos e backend remoto do desafio.'; exit 1; fi; echo 'Sucesso: Módulo Terraform de produção implantado!';
