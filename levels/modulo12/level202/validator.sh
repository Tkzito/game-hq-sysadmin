#!/bin/bash
set -euo pipefail
if ! grep -qE 'create-subnet' /home/operator/.bash_history || ! grep -qE 'create-nat-gateway' /home/operator/.bash_history; then echo 'Falha: Subnets privadas/públicas ou NAT Gateway não provisionados.'; exit 1; fi; echo 'Sucesso: Subnets segmentadas com sucesso!';
