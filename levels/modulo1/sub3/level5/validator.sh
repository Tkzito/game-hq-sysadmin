#!/bin/bash
# validator.sh - Nível 25
set -euo pipefail

DEST_DIR="/home/operator/tools"

# 1. Verificar se a pasta de destino existe
if [ ! -d "$DEST_DIR" ]; then
    echo "Erro: O diretório '$DEST_DIR' não foi criado."
    exit 1
fi

# 2. Verificar se arquivos foram descompactados corretamente
if [ ! -f "$DEST_DIR/scan_network.sh" ]; then
    echo "Erro: O script 'scan_network.sh' não foi encontrado em '$DEST_DIR'."
    exit 1
fi

if [ ! -f "$DEST_DIR/decrypt_hash.py" ]; then
    echo "Erro: O script 'decrypt_hash.py' não foi encontrado em '$DEST_DIR'."
    exit 1
fi

# 3. Verificar se as permissões foram mantidas (scan_network.sh deve ser executável)
if [ ! -x "$DEST_DIR/scan_network.sh" ]; then
    echo "Erro: O arquivo 'scan_network.sh' não tem permissão de execução."
    exit 1
fi

echo "Parabéns! Você extraiu as ferramentas no diretório correto com sucesso!"
exit 0
