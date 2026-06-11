#!/bin/bash
set -euo pipefail
SCRIPT="/home/operator/ajuda.sh"
if [ ! -x "$SCRIPT" ]; then
    echo "Erro: script nao executavel."
    exit 1
fi
# Testar help
HELP_EXPECTED=$(printf "Uso: ajuda.sh [opcao]
Opcoes:
  -h, --help    Mostra esta mensagem de ajuda
  -s, --status  Exibe o status do sistema")
OUT1=$("$SCRIPT" -h)
OUT2=$("$SCRIPT" --help)
OUT3=$("$SCRIPT")
if [ "$OUT1" != "$HELP_EXPECTED" ] || [ "$OUT2" != "$HELP_EXPECTED" ] || [ "$OUT3" != "$HELP_EXPECTED" ]; then
    echo "Falha no help."
    exit 1
fi
# Testar status
OUT4=$("$SCRIPT" -s)
OUT5=$("$SCRIPT" --status)
if [ "$OUT4" != "Status: OK" ] || [ "$OUT5" != "Status: OK" ]; then
    echo "Falha no status."
    exit 1
fi
# Testar erro
set +e
ERR_OUT=$("$SCRIPT" --invalido 2>&1 >/dev/null)
CODE=$?
set -e
if [ "$CODE" -ne 1 ] || [ "$ERR_OUT" != "Erro: Opcao invalida. Use -h para ajuda." ]; then
    echo "Falha ao tratar opcao invalida: '$ERR_OUT' (exit $CODE)"
    exit 1
fi
echo "Sucesso: Menu de ajuda e tratamento de stderr implementados perfeitamente!"
exit 0
