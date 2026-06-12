#!/bin/bash
set -euo pipefail
if ! grep -qE 'authorize-security-group-ingress|create-security-group' /home/operator/.bash_history; then echo 'Falha: Regras do Security Group não configuradas.'; exit 1; fi; echo 'Sucesso: Firewalls de portas ativados na nuvem!';
