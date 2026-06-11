#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 8
set -euo pipefail

mkdir -p /home/operator/cache_velho

echo "dados obsoletos" > /home/operator/cache.tmp
echo "obsoleto 1" > /home/operator/cache_velho/d1.log
echo "obsoleto 2" > /home/operator/cache_velho/d2.log

chown -R operator:operator /home/operator
