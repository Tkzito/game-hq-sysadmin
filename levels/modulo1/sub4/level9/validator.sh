#!/bin/bash
# validator.sh - Nível 39
set -euo pipefail

SCRIPT="/home/operator/monitor.sh"

# 1. Garantir que o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O script '$SCRIPT' não existe."
    exit 1
fi

# 2. Testar sem nenhuma flag (modo silencioso)
out_silent=$(bash "$SCRIPT" 2>&1)
if echo "$out_silent" | grep -q "DEBUG:"; then
    echo "Erro: O script exibiu mensagens de depuração mesmo sem a flag ou variável de debug ativas."
    exit 1
fi
if ! echo "$out_silent" | grep -q "STATUS MEMORIA: OK"; then
    echo "Erro: O script não exibiu a saída padrão 'STATUS MEMORIA: OK' no modo silencioso."
    exit 1
fi

# 3. Testar com a opção -d
out_flag=$(bash "$SCRIPT" -d 2>&1)
if ! echo "$out_flag" | grep -q "DEBUG: Modo verboso ativo" || ! echo "$out_flag" | grep -q "DEBUG: Limite de memoria configurado para 90%"; then
    echo "Erro: O script não ativou o modo debug ao passar o argumento '-d'."
    exit 1
fi

# 4. Testar com a variável de ambiente DEBUG=1
out_env=$(DEBUG=1 bash "$SCRIPT" 2>&1)
if ! echo "$out_env" | grep -q "DEBUG: Modo verboso ativo" || ! echo "$out_env" | grep -q "DEBUG: Limite de memoria configurado para 90%"; then
    echo "Erro: O script não ativou o modo debug ao definir a variável de ambiente 'DEBUG=1'."
    exit 1
fi

echo "Parabéns! O script de monitoramento agora suporta depuração e logs verbosos controlados por flag CLI e variável de ambiente!"
exit 0
