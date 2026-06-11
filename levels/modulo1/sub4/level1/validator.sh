#!/bin/bash
# validator.sh - Nível 31
set -euo pipefail

SCRIPT="/home/operator/reboot.sh"

# 1. Verificar se o arquivo existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não existe."
    exit 1
fi

# 2. Executar validação de sintaxe estática (bash -n)
if ! bash -n "$SCRIPT" > /dev/null 2>&1; then
    echo "Erro: O script '$SCRIPT' ainda possui erros de sintaxe estrutural (falhou no teste 'bash -n')."
    exit 1
fi

# 3. Executar o script para garantir que funciona como esperado
output_force=$(bash "$SCRIPT" force 2>&1)
output_normal=$(bash "$SCRIPT" normal 2>&1)

if ! echo "$output_force" | grep -q "Forçando reboot..."; then
    echo "Erro: O script não se comporta corretamente quando o argumento 'force' é passado."
    exit 1
fi

if ! echo "$output_normal" | grep -q "Reboot normal..."; then
    echo "Erro: O script não se comporta corretamente quando o argumento 'normal' é passado."
    exit 1
fi

if ! echo "$output_normal" | grep -q "Contagem: 1"; then
    echo "Erro: A contagem regressiva (loop for) não foi executada com sucesso."
    exit 1
fi

echo "Parabéns! Você utilizou 'bash -n' para encontrar e consertar os erros de sintaxe do script de reboot!"
exit 0
