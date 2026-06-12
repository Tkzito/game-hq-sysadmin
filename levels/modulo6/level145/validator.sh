#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"

if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Erro: Repositório não encontrado."
    exit 1
fi

# Verificar se ainda há arquivos conflitando
if git -C "$REPO_DIR" status --porcelain | grep -q '^UU'; then
    echo "Erro: Ainda existem conflitos pendentes não resolvidos no Git."
    exit 1
fi

# Verificar se os marcadores de conflito foram removidos de app.conf
if grep -qE '<<<<<<<|=======|>>>>>>>' "$REPO_DIR/app.conf"; then
    echo "Erro: O arquivo app.conf ainda contém marcadores de conflito do Git."
    exit 1
fi

# Verificar se a porta final é 9000
PORT_VALUE=$(grep "PORT" "$REPO_DIR/app.conf" | cut -d'=' -f2 || echo "")
if [ "$PORT_VALUE" != "9000" ]; then
    echo "Erro: O valor da porta em app.conf deve ser 9000 (produção), mas está '$PORT_VALUE'."
    exit 1
fi

# Verificar se o merge foi concluído
if [ -f "$REPO_DIR/.git/MERGE_HEAD" ]; then
    echo "Erro: O merge ainda está pendente de ser comitado no Git."
    exit 1
fi

echo "Sucesso: O conflito de merge foi resolvido mantendo a porta correta de produção!"
exit 0
