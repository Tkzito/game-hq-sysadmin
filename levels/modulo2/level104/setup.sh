#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/farmacia/logs
echo "log 1" > /home/operator/farmacia/logs/fisc.log
echo "relatorio" > /home/operator/farmacia/relat.txt
chown -R operator:operator /home/operator/farmacia
