#!/bin/bash
# validator.sh - Verifica se o jogador copiou e moveu os arquivos corretamente.
set -euo pipefail

# 1. Verificar backup/firmware.bin
if [ ! -f "/home/operator/backup/firmware.bin" ]; then
    echo "Falha: O backup de firmware.bin não foi localizado em /home/operator/backup/."
    exit 1
fi

# 2. Verificar se relatorio_final.txt existe na home
if [ ! -f "/home/operator/relatorio_final.txt" ]; then
    echo "Falha: O arquivo relatorio_final.txt não existe na raiz do operador."
    exit 1
fi

# 3. Verificar se o original legado/relatorio.txt foi movido
if [ -f "/home/operator/legado/relatorio.txt" ]; then
    echo "Falha: O arquivo legado/relatorio.txt ainda está no local original. Use 'mv'."
    exit 1
fi

echo "Sucesso: Backup de firmware copiado e relatório antigo movido/renomeado!"
exit 0
