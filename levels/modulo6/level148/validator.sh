#!/bin/bash
set -euo pipefail

BARE_HOOK="/var/git/api.git/hooks/post-receive"
REPO_DIR="/home/operator/api"
DEPLOY_DIR="/var/www/html"

if [ ! -f "$BARE_HOOK" ]; then
    echo "Erro: O hook post-receive não foi encontrado em $BARE_HOOK."
    exit 1
fi

if [ ! -x "$BARE_HOOK" ]; then
    echo "Erro: O arquivo de hook post-receive não tem permissão de execução."
    exit 1
fi

# Limpar diretório de deploy para garantir que os arquivos apareçam pós-push
rm -rf "$DEPLOY_DIR"/*

# Criar alteração local
echo "Deploy test - $(date)" > "$REPO_DIR/deploy_test.txt"
git -C "$REPO_DIR" add deploy_test.txt
git -C "$REPO_DIR" commit -m "test: trigger deploy" >/dev/null 2>&1 || true

# Empurrar para a master do remoto como operator
sudo -u operator git -C "$REPO_DIR" push origin master >/dev/null 2>&1 || {
    echo "Erro: O comando git push origin master falhou."
    exit 1
}

# Verificar se o arquivo do deploy foi descompactado no diretório
if [ ! -f "$DEPLOY_DIR/deploy_test.txt" ]; then
    echo "Erro: O arquivo do deploy não foi extraído em $DEPLOY_DIR após o push."
    exit 1
fi

echo "Sucesso: O hook post-receive realiza o deploy contínuo em /var/www/html!"
exit 0
