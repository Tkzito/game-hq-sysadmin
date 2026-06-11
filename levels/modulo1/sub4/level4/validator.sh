#!/bin/bash
# validator.sh - Nível 34
set -euo pipefail

SCRIPT="/home/operator/diagnostico.sh"

# 1. Verificar se o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não existe."
    exit 1
fi

# 2. Verificar se o script realmente utiliza o comando 'read'
if ! grep -q "\bread\b" "$SCRIPT"; then
    echo "Erro: O comando 'read' não foi encontrado no código do script. Você deve capturar a entrada do usuário de forma interativa."
    exit 1
fi

# 3. Testar entrada SIM
out_sim=$(echo "SIM" | bash "$SCRIPT" 2>&1 || true)
exit_sim=$?
if [ "$exit_sim" -ne 0 ]; then
    echo "Erro: Ao responder SIM, o script retornou código de saída diferente de zero ($exit_sim)."
    exit 1
fi
if ! echo "$out_sim" | grep -q "Iniciando Diagnóstico..."; then
    echo "Erro: Ao responder SIM, a saída não foi a esperada. Saída: $out_sim"
    exit 1
fi

# 4. Testar entrada NAO
out_nao=$(echo "NAO" | bash "$SCRIPT" 2>&1 || true)
exit_nao=$?
if [ "$exit_nao" -ne 0 ]; then
    echo "Erro: Ao responder NAO, o script retornou código de saída diferente de zero ($exit_nao)."
    exit 1
fi
if ! echo "$out_nao" | grep -q "Diagnóstico Cancelado"; then
    echo "Erro: Ao responder NAO, a saída não foi a esperada. Saída: $out_nao"
    exit 1
fi

# 5. Testar entrada inválida
out_inv=$(echo "X" | bash "$SCRIPT" 2>&1 || true)
exit_inv=$?
if [ "$exit_inv" -ne 1 ]; then
    echo "Erro: Ao responder uma entrada inválida, o script deveria retornar código de saída 1 (retornou $exit_inv)."
    exit 1
fi
if ! echo "$out_inv" | grep -q "Entrada Inválida"; then
    echo "Erro: Ao responder uma entrada inválida, a saída não foi a esperada. Saída: $out_inv"
    exit 1
fi

echo "Parabéns! O script interativo agora lê a entrada do operador, valida as opções corretamente e gerencia os fluxos de saída!"
exit 0
