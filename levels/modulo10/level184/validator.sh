#!/bin/bash
set -euo pipefail
if ! grep -qE 'module "vpc"' /home/operator/infra/main.tf; then echo 'Falha: A VPC não foi declarada usando módulos.'; exit 1; fi; echo 'Sucesso: Redes isoladas modularizadas!';
