#!/bin/bash
# validator.sh - Verifica a consolidação dos passos e a mesclagem final dos arquivos.
set -euo pipefail

# 1. Verificar se painel/esquerdo/parte1.txt existe e original sumiu
if [ ! -f "/home/operator/painel/esquerdo/parte1.txt" ]; then
    echo "Falha: O arquivo parte1.txt não foi movido para /home/operator/painel/esquerdo/."
    exit 1
fi

if [ -f "/home/operator/sistema_antigo/parte1.txt" ]; then
    echo "Falha: O arquivo original /home/operator/sistema_antigo/parte1.txt ainda existe."
    exit 1
fi

# 2. Verificar se painel/direito/parte2.txt existe e original sumiu
if [ ! -f "/home/operator/painel/direito/parte2.txt" ]; then
    echo "Falha: O arquivo parte2.txt não foi movido para /home/operator/painel/direito/."
    exit 1
fi

if [ -f "/home/operator/sistema_antigo/parte2.txt" ]; then
    echo "Falha: O arquivo original /home/operator/sistema_antigo/parte2.txt ainda existe."
    exit 1
fi

# 3. Verificar a mesclagem
MERGED="/home/operator/painel/config_mesclada.txt"
if [ ! -f "$MERGED" ]; then
    echo "Falha: O arquivo /home/operator/painel/config_mesclada.txt não existe."
    exit 1
fi

CONTENT=$(cat "$MERGED" | tr -d '[:space:]')
# Esperado: [PAINEL_AURA]status_modulos=online
if [ "$CONTENT" != "[PAINEL_AURA]status_modulos=online" ]; then
    echo "Falha: A mesclagem no arquivo config_mesclada.txt não está correta."
    exit 1
fi

echo "Sucesso: O painel neural da AURA-7 foi completamente reconstituído e ativado!"
exit 0
