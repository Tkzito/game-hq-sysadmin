#!/bin/bash
set -euo pipefail
if ! grep -qE 'terraform apply' /home/operator/.bash_history; then echo 'Falha: O plano de infraestrutura não foi aplicado (rode terraform apply).'; exit 1; fi; echo 'Sucesso: Instância computacional provisionada via IaC!';
