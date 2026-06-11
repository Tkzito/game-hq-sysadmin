#!/bin/bash
# validator.sh - Nível 28
set -euo pipefail

GIANT_FILE="/home/operator/giant_log.txt"

# 1. Verificar se o arquivo foi criado
if [ ! -f "$GIANT_FILE" ]; then
    echo "Erro: O arquivo '$GIANT_FILE' contendo o caminho do log gigante não foi criado."
    exit 1
fi

# 2. Validar conteúdo (caminho absoluto ou relativo válido)
conteudo=$(tr -d '[:space:]' < "$GIANT_FILE")
esperado_abs="/home/operator/logs/system_dump_corrupt.log"
esperado_rel="logs/system_dump_corrupt.log"
esperado_base="system_dump_corrupt.log"

if [ "$conteudo" != "$esperado_abs" ] && [ "$conteudo" != "$esperado_rel" ] && [ "$conteudo" != "$esperado_base" ]; then
    echo "Erro: O conteúdo em '$GIANT_FILE' não aponta para o log correto."
    exit 1
fi

echo "Parabéns! Você utilizou a busca por tamanho de arquivo com find para localizar logs gigantescos!"
exit 0
