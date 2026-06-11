#!/bin/bash
# validator.sh - Valida o tratamento de variáveis vazias no script do jogador.
set -euo pipefail

SCRIPT="/home/operator/valida_ip.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo valida_ip.sh não existe em /home/operator."
    exit 1
fi

# Verificar se usou -z ou -n no teste condicional do script
if ! grep -qE "(\[-z|test -z|\[\[ -z|\[ -n|test -n|\[\[ -n)" "$SCRIPT"; then
    echo "Falha: Você deve implementar a validação de nulo/vazio usando os operadores -z ou -n do shell."
    exit 1
fi

# 1. Testar execução com IP vazio
OUTPUT_VAZIO=$("$SCRIPT" 2>/dev/null || true)
if [[ "$OUTPUT_VAZIO" != *"IP invalido"* ]]; then
    echo "Falha: Quando o IP está vazio, o script não imprimiu 'IP invalido'."
    exit 1
fi

# 2. Testar execução simulando um IP preenchido
cp "$SCRIPT" /tmp/test_valida_ip.sh
sed -i 's/IP=""/IP="10.0.0.1"/g' /tmp/test_valida_ip.sh
chmod +x /tmp/test_valida_ip.sh
OUTPUT_PREENCHIDO=$(/tmp/test_valida_ip.sh 2>/dev/null || true)
rm -f /tmp/test_valida_ip.sh

if [[ "$OUTPUT_PREENCHIDO" != *"Conectando ao IP: 10.0.0.1"* ]]; then
    echo "Falha: Quando o IP está preenchido, o script barrou ou não imprimiu a frase de conexão."
    exit 1
fi

echo "Sucesso: Validação de variáveis vazias implementada com sucesso!"
exit 0
