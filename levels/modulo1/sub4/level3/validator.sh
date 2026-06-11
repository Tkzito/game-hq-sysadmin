#!/bin/bash
# validator.sh - Nível 33
set -euo pipefail

SCRIPT="/home/operator/check_service.sh"

# 1. Garantir que o script existe e é executável
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: O script '$SCRIPT' não existe ou não está executável."
    exit 1
fi

# Garantir que o ambiente comece limpo (sem simular_offline)
rm -f /home/operator/simular_offline

# 2. Testar cenário ONLINE
output_online=$(bash "$SCRIPT" 2>&1 || true)
exit_online=$?

if [ "$exit_online" -ne 0 ]; then
    echo "Erro: No cenário ONLINE, o script retornou saída não-zero ($exit_online)."
    exit 1
fi

if ! echo "$output_online" | grep -q "SERVICO ONLINE"; then
    echo "Erro: No cenário ONLINE, a saída exibida não foi 'SERVICO ONLINE'. Saída: $output_online"
    exit 1
fi

# 3. Testar cenário OFFLINE
touch /home/operator/simular_offline
output_offline=$(bash "$SCRIPT" 2>&1 || true)
exit_offline=$?

# Limpar o arquivo de simulação após o teste
rm -f /home/operator/simular_offline

if [ "$exit_offline" -ne 1 ]; then
    echo "Erro: No cenário OFFLINE, o script deveria ter retornado código de saída 1 (retornou $exit_offline)."
    exit 1
fi

if ! echo "$output_offline" | grep -q "SERVICO OFFLINE"; then
    echo "Erro: No cenário OFFLINE, a saída exibida não foi 'SERVICO OFFLINE'. Saída: $output_offline"
    exit 1
fi

echo "Parabéns! O script agora analisa dinamicamente o código de saída (\$?) do comando executado anteriormente e retorna os códigos corretos!"
exit 0
