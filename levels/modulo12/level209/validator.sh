#!/bin/bash
set -euo pipefail
if ! grep -qE 'autoscaling|scaling-policy' /home/operator/.bash_history; then echo 'Falha: Auto Scaling Group para escalabilidade de instâncias não configurado.'; exit 1; fi; echo 'Sucesso: Dimensionamento automático de infraestrutura ativo!';
