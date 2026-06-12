#!/bin/bash
set -euo pipefail
if ! grep -qE 'aws ec2 create-vpc' /home/operator/.bash_history; then echo 'Falha: Comando de criação de VPC (aws ec2 create-vpc) não executado.'; exit 1; fi; echo 'Sucesso: Rede virtual VPC provisionada na nuvem!';
