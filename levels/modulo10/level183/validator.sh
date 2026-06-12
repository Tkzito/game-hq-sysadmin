#!/bin/bash
set -euo pipefail
if ! grep -qE 'terraform show|terraform state list' /home/operator/.bash_history; then echo 'Falha: O estado do Terraform não foi inspecionado.'; exit 1; fi; echo 'Sucesso: Arquivo de estado mapeado!';
