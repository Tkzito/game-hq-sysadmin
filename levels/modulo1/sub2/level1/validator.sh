#!/bin/bash
# validator.sh - Valida shebang e executabilidade de diagnostico.sh.
set -euo pipefail

SCRIPT="/home/operator/diagnostico.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "Falha: O arquivo diagnostico.sh não existe."
    exit 1
fi

FIRST_LINE=$(head -n 1 "$SCRIPT")

if [ "$FIRST_LINE" != "#!/bin/bash" ] && [ "$FIRST_LINE" != "#!/usr/bin/env bash" ]; then
    echo "Falha: A primeira linha do script deve ser exatamente '#!/bin/bash' ou '#!/usr/bin/env bash'."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "Falha: O script nao possui permissão de execução. Utilize: chmod +x diagnostico.sh"
    exit 1
fi

# Testar se executa e gera saída correta
OUTPUT=$("$SCRIPT")
if [[ "$OUTPUT" != *"AURA STATUS: EXCELENTE"* ]]; then
    echo "Falha: O script não produziu a saída esperada."
    exit 1
fi

echo "Sucesso: Shebang inserida e script rodando como executável Bash!"
exit 0
