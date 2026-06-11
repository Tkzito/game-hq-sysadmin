#!/bin/bash
# validator.sh - Nível 26
set -euo pipefail

CHAVE_FILE="/home/operator/chave.txt"
LOG_GZ="/home/operator/log_antigo.log.gz"
LOG_UNCOMPRESSED="/home/operator/log_antigo.log"

# 1. Verificar se o log compactado ainda existe
if [ ! -f "$LOG_GZ" ]; then
    echo "Erro: O arquivo compactado original '$LOG_GZ' sumiu ou foi apagado/descompactado."
    exit 1
fi

# 2. Verificar se o arquivo descompactado não existe (exigência de não descompactar)
if [ -f "$LOG_UNCOMPRESSED" ]; then
    echo "Erro: Você descompactou o arquivo de log no disco! A missão pedia para ler sem descompactar."
    exit 1
fi

# 3. Verificar se a chave foi encontrada e salva
if [ ! -f "$CHAVE_FILE" ]; then
    echo "Erro: O arquivo '$CHAVE_FILE' não foi criado com a chave."
    exit 1
fi

# 4. Validar o conteúdo do arquivo chave.txt
conteudo=$(tr -d '[:space:]' < "$CHAVE_FILE")
if [ "$conteudo" != "KEY_DEC_8891_AURA_SECURE" ]; then
    echo "Erro: A chave salva no arquivo '$CHAVE_FILE' está incorreta."
    exit 1
fi

echo "Parabéns! Você utilizou zcat/zgrep para ler o conteúdo compactado com eficiência sem usar espaço em disco!"
exit 0
