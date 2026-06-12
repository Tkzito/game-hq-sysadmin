#!/bin/bash
set -euo pipefail
if ! grep -qE 'terraform init' /home/operator/.bash_history && [ ! -d /home/operator/infra/.terraform ]; then echo 'Falha: O diretório do Terraform não foi inicializado (rode terraform init).'; exit 1; fi; echo 'Sucesso: Plugins de infraestrutura baixados!';
