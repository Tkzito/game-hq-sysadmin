#!/bin/bash
set -euo pipefail
echo "Banco de dados de medicamentos" > /home/operator/medicamentos.db
chmod 644 /home/operator/medicamentos.db
chown operator:operator /home/operator/medicamentos.db
