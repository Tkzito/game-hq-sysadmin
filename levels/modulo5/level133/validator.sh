#!/bin/bash
set -euo pipefail

SCRIPT_PATH="/home/operator/wait_service.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não foi encontrado."
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Erro: O script '$SCRIPT_PATH' não tem permissão de execução."
    exit 1
fi

# Limpar tentativas anteriores para testar a execução isolada
echo "0" > /tmp/curl_attempts

# Executar com limite de tempo de 15 segundos para evitar loop infinito
timeout 15 "$SCRIPT_PATH" > /dev/null 2>&1 || {
    echo "Erro: O script falhou ou demorou demais para responder (timeout/loop infinito)."
    exit 1
}

if [ ! -f /tmp/curl_attempts ]; then
    echo "Erro: O script não fez chamadas via curl para o endpoint de healthcheck."
    exit 1
fi

ATTEMPTS=$(cat /tmp/curl_attempts)
if [ "$ATTEMPTS" -lt 3 ]; then
    echo "Erro: O script não fez tentativas suficientes ou parou antes do serviço responder sucesso. Tentativas registradas: $ATTEMPTS"
    exit 1
fi

# Validar se o script usa while ou until
CONTENT=$(cat "$SCRIPT_PATH")
if [[ ! "$CONTENT" =~ "while" ]] && [[ ! "$CONTENT" =~ "until" ]]; then
    echo "Erro: O script deve conter uma estrutura de repetição condicional 'while' ou 'until'."
    exit 1
fi

echo "Sucesso: O script aguarda o serviço responder de forma resiliente!"
exit 0
