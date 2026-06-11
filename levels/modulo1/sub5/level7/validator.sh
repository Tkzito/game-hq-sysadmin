#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/validar_num.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
# Testar nulo
set +e
O1=$("$SCRIPT" "" 2>&1)
C1=$?
O2=$("$SCRIPT" "abc" 2>&1)
C2=$?
O3=$("$SCRIPT" "12a3" 2>&1)
C3=$?
O4=$("$SCRIPT" "456" 2>&1)
C4=$?
set -e
if [ "$C1" -ne 1 ] || [ "$O1" != "ERRO: Argumento ausente." ]; then
    echo "Falha no teste de nulo: $O1 (exit $C1)"
    exit 1
fi
if [ "$C2" -ne 1 ] || [ "$O2" != "ERRO: Nao e um numero valido." ]; then
    echo "Falha no teste com texto: $O2 (exit $C2)"
    exit 1
fi
if [ "$C3" -ne 1 ] || [ "$O3" != "ERRO: Nao e um numero valido." ]; then
    echo "Falha no teste com numero misto: $O3 (exit $C3)"
    exit 1
fi
if [ "$C4" -ne 0 ] || [ "$O4" != "SUCESSO: Limite definido para 456." ]; then
    echo "Falha no teste com numero correto: $O4 (exit $C4)"
    exit 1
fi
echo "Sucesso: Validacao numerica robusta comprovada!"
exit 0
