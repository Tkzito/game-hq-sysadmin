#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 9
set -euo pipefail

mkdir -p /home/operator/dados
cd /home/operator

# arquivoA: imagem PNG mockada
printf "\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00" > dados/arquivoA

# arquivoB: texto ASCII com exatamente 42 linhas
for i in $(seq 1 42); do
    echo "Configuracao de interface de backup: Parametro-$i = $i" >> dados/arquivoB
done

# arquivoC: gzip mockado
printf "\x1f\x8b\x08\x00\x00\x00\x00\x00" > dados/arquivoC

chown -R operator:operator /home/operator
