#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/saudacao_padrao.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
# Testar com variavel vazia
OUT_PADRAO=$(env -i /bin/bash "$SCRIPT")
# Testar com variavel setada
OUT_SETADA=$(NOME_USUARIO="Arthur" /bin/bash "$SCRIPT")

if [ "$OUT_PADRAO" = "Ola, Convidado" ] && [ "$OUT_SETADA" = "Ola, Arthur" ]; then
    echo "Sucesso: Expansao de valor padrao funcionando perfeitamente!"
    exit 0
else
    echo "Falha: Saida incorreta. Padrao: '$OUT_PADRAO', Setada: '$OUT_SETADA'"
    exit 1
fi
