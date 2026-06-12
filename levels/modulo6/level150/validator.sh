#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"
BARE_HOOK="/var/git/api.git/hooks/post-receive"
LOCAL_HOOK="$REPO_DIR/.git/hooks/pre-commit"
DEPLOY_DIR="/var/www/html"

# 1. Verificar se os conflitos em app.conf foram resolvidos
if git -C "$REPO_DIR" status --porcelain | grep -q '^UU'; then
    echo "Erro: Conflitos em app.conf ainda não foram resolvidos."
    exit 1
fi

# 2. Verificar se o hook pre-commit local existe e é executável
if [ ! -x "$LOCAL_HOOK" ]; then
    echo "Erro: O hook pre-commit local não foi encontrado ou não tem permissão de execução."
    exit 1
fi

# Testar se o hook pre-commit bloqueia commits com PRIVATE_KEY
echo "PRIVATE_KEY=secret_stuff" > "$REPO_DIR/leak.txt"
git -C "$REPO_DIR" add leak.txt
if sudo -u operator git -C "$REPO_DIR" commit -m "test leak" >/dev/null 2>&1; then
    git -C "$REPO_DIR" reset HEAD leak.txt >/dev/null 2>&1 || true
    rm -f "$REPO_DIR/leak.txt"
    echo "Erro: O hook pre-commit local falhou ao permitir chaves privadas."
    exit 1
fi
git -C "$REPO_DIR" reset HEAD leak.txt >/dev/null 2>&1 || true
rm -f "$REPO_DIR/leak.txt"

# 3. Verificar se o hook post-receive remoto existe e é executável
if [ ! -x "$BARE_HOOK" ]; then
    echo "Erro: O hook post-receive remoto em $BARE_HOOK não foi encontrado ou não é executável."
    exit 1
fi

# 4. Verificar sincronia local/remota (push executado com sucesso)
LOCAL_HASH=$(git -C "$REPO_DIR" rev-parse HEAD 2>/dev/null || echo "1")
BARE_HASH=$(git -C "/var/git/api.git" rev-parse master 2>/dev/null || echo "2")

if [ "$LOCAL_HASH" != "$BARE_HASH" ]; then
    echo "Erro: Repositório local e remoto não estão sincronizados (falta rodar git push)."
    exit 1
fi

# 5. Verificar se os arquivos estão na pasta de deploy
if [ ! -f "$DEPLOY_DIR/app.conf" ]; then
    echo "Erro: Os arquivos da API não foram encontrados no diretório de deploy $DEPLOY_DIR."
    exit 1
fi

echo "Sucesso: A pipeline inquebrável da TechVanguard foi validada com êxito!"
exit 0
