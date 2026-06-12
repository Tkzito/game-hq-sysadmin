#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/relatorios
echo "receita secreta da farmacia" > /home/operator/relatorios/receitas.txt
echo "lucro anual: R$ 500.000" > /home/operator/relatorios/financeiro.txt
chmod 666 /home/operator/relatorios/receitas.txt
chmod 666 /home/operator/relatorios/financeiro.txt
chown -R operator:operator /home/operator
