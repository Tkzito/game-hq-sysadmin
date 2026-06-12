#!/bin/bash
set -euo pipefail

REPO_DIR="/home/operator/api"
HOOK_PATH="$REPO_DIR/.git/hooks/pre-commit"

if [ ! -f "$HOOK_PATH" ]; then
    echo "Erro: O hook pre-commit não foi encontrado em $HOOK_PATH."
    exit 1
fi

if [ ! -x "$HOOK_PATH" ]; then
    echo "Erro: O arquivo de hook pre-commit não tem permissão de execução (use chmod +x)."
    exit 1
fi

# Limpar arquivos indesejados de tentativas passadas
git -C "$REPO_DIR" reset HEAD --hard >/dev/null 2>&1 || true

# Testar o bloqueio de commits com chaves vazadas
echo "SECRET_KEY=PRIVATE_KEY_VALUE" > "$REPO_DIR/secret.txt"
git -C "$REPO_DIR" add secret.txt

# O commit deve ser bloqueado pelo hook (retornar exit code diferente de zero)
if sudo -u operator git -C "$REPO_DIR" commit -m "test: commit proibido" >/dev/null 2>&1; then
    git -C "$REPO_DIR" reset HEAD secret.txt >/dev/null 2>&1 || true
    rm -f "$REPO_DIR/secret.txt"
    echo "Erro: O hook pre-commit permitiu um commit contendo 'PRIVATE_KEY'."
    exit 1
fi

# Limpar o arquivo de teste bloqueado
git -C "$REPO_DIR" reset HEAD secret.txt >/dev/null 2>&1 || true
rm -f "$REPO_DIR/secret.txt"

# Testar commit com chaves alternativas (PASSWORD)
echo "PASS=PASSWORD_123" > "$REPO_DIR/pwd.txt"
git -C "$REPO_DIR" add pwd.txt
if sudo -u operator git -C "$REPO_DIR" commit -m "test: commit proibido pwd" >/dev/null 2>&1; then
    git -C "$REPO_DIR" reset HEAD pwd.txt >/dev/null 2>&1 || true
    rm -f "$REPO_DIR/pwd.txt"
    echo "Erro: O hook pre-commit permitiu um commit contendo 'PASSWORD'."
    exit 1
fi

# Limpar
git -C "$REPO_DIR" reset HEAD pwd.txt >/dev/null 2>&1 || true
rm -f "$REPO_DIR/pwd.txt"

# Testar um commit válido (deve passar)
echo "console.log('Safe code');" > "$REPO_DIR/safe.js"
git -C "$REPO_DIR" add safe.js

if ! sudo -u operator git -C "$REPO_DIR" commit -m "test: commit seguro" >/dev/null 2>&1; then
    git -C "$REPO_DIR" reset HEAD safe.js >/dev/null 2>&1 || true
    rm -f "$REPO_DIR/safe.js"
    echo "Erro: O hook pre-commit bloqueou um commit válido e seguro."
    exit 1
fi

echo "Sucesso: O hook pre-commit bloqueia chaves expostas e permite commits limpos!"
exit 0
