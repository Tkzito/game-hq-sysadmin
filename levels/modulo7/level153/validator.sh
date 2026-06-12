#!/bin/bash
set -euo pipefail

DF_FILE="/home/operator/Dockerfile"

if [ ! -f "$DF_FILE" ]; then
    echo "Erro: O arquivo 'Dockerfile' nao foi encontrado em /home/operator/"
    exit 1
fi

# Convert content to lowercase for easier validation
CONTENT=$(tr '[:upper:]' '[:lower:]' < "$DF_FILE")

# Basic checks
if ! echo "$CONTENT" | grep -q "from"; then
    echo "Erro: Faltando a instrucao FROM no Dockerfile."
    exit 1
fi

if ! echo "$CONTENT" | grep -q "alpine"; then
    echo "Erro: A imagem base deve ser baseada em Alpine (ex: alpine, node:alpine, etc.)."
    exit 1
fi

if ! echo "$CONTENT" | grep -q "workdir"; then
    echo "Erro: Faltando a instrucao WORKDIR."
    exit 1
fi

if ! echo "$CONTENT" | grep -q "copy"; then
    echo "Erro: Faltando copiar os arquivos do projeto com a instrucao COPY."
    exit 1
fi

if ! echo "$CONTENT" | grep -q "expose 3000"; then
    echo "Erro: A porta 3000 nao foi exposta corretamente com EXPOSE 3000."
    exit 1
fi

if ! echo "$CONTENT" | grep -q "cmd"; then
    echo "Erro: Faltando definir o comando padrão CMD para rodar o app.js."
    exit 1
fi

echo "Sucesso: Dockerfile validado com sucesso!"
exit 0
