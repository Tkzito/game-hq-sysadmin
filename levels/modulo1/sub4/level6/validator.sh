#!/bin/bash
# validator.sh - Nível 36
set -euo pipefail

SCRIPT="/home/operator/deploy.sh"

# 1. Verificar se o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não existe."
    exit 1
fi

# 2. Verificar se set -e e set -u foram ativados
if ! grep -E -q "set\s+-.*e" "$SCRIPT" || ! grep -E -q "set\s+-.*u" "$SCRIPT"; then
    echo "Erro: As opções 'set -e' e 'set -u' (ou 'set -eu') não foram adicionadas no topo do script."
    exit 1
fi

# Limpar destino para garantir que a cópia ocorra neste teste
rm -f /home/operator/dest/app.txt

# 3. Executar o script corrigido e conferir sucesso
output=$(bash "$SCRIPT" 2>&1)
exit_code=$?

if [ "$exit_code" -ne 0 ]; then
    echo "Erro: O script corrigido falhou ao rodar (retornou código de saída $exit_code)."
    exit 1
fi

if [ ! -f "/home/operator/dest/app.txt" ]; then
    echo "Erro: Os arquivos não foram copiados com sucesso para '/home/operator/dest/'."
    exit 1
fi

# 4. Validar se o set -e está funcionando (induzir falha apagando a origem e testando se ele aborta com código de erro)
rm -f /home/operator/source/app.txt
output_error=$(bash "$SCRIPT" 2>&1 || true)
exit_error=$?

# Restaurar arquivo para o usuário não ficar quebrado caso falte rodar mais vezes
echo "versao=1.0" > /home/operator/source/app.txt

if [ "$exit_error" -eq 0 ]; then
    echo "Erro: O script não abortou quando a cópia falhou (ping/cp falhou mas o script continuou. Verifique se ativou set -e corretamente)."
    exit 1
fi

echo "Parabéns! Você implementou o modo de depuração estrita (-e, -u) e depurou variáveis e comandos falhos com sucesso!"
exit 0
