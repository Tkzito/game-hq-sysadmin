#!/bin/bash
# validator.sh - Nível 35
set -euo pipefail

SCRIPT="/home/operator/cleanup.sh"
TEMP_DIR="/home/operator/tmp_run"

# 1. Verificar se o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não foi encontrado."
    exit 1
fi

# 2. Verificar se a palavra-chave 'trap' foi adicionada
if ! grep -q "trap\s" "$SCRIPT"; then
    echo "Erro: O comando 'trap' não foi implementado no script."
    exit 1
fi

# 3. Garantir que a pasta temporária não exista antes de começar
rm -rf "$TEMP_DIR"

# 4. Executar o script e verificar se ele limpa automaticamente ao finalizar (EXIT)
output=$(bash "$SCRIPT" 2>&1)
exit_code=$?

if [ "$exit_code" -ne 0 ]; then
    echo "Erro: O script terminou com falha (código de saída $exit_code)."
    exit 1
fi

# 5. O diretório temporário deve ter sido removido
if [ -d "$TEMP_DIR" ]; then
    echo "Erro: O diretório temporário '$TEMP_DIR' não foi removido pelo script ao sair."
    exit 1
fi

# 6. A saída deve conter a mensagem de limpeza
if ! echo "$output" | grep -q "Executando limpeza de segurança..."; then
    echo "Erro: A função de limpeza 'limpar_arquivos' não parece ter sido acionada."
    exit 1
fi

echo "Parabéns! O script registrou o trap e limpou todos os arquivos temporários automaticamente após a execução!"
exit 0
