#!/bin/bash
set -euo pipefail
echo "planilha financeira" > /home/operator/planilha.xlsx
chmod 644 /home/operator/planilha.xlsx
chown operator:operator /home/operator/planilha.xlsx
