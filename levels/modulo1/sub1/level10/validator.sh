#!/bin/bash
# validator.sh - Valida se o script ligar_coolers.sh foi executado corretamente.
set -euo pipefail

SCRIPT_PATH="/home/operator/.bunker_config/sistema/scripts/ligar_coolers.sh"
HISTORY_FILE="/home/operator/.bash_history"

# 1. Verificar se o script ligar_coolers.sh existe
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Falha: O script ligar_coolers.sh não foi encontrado no caminho correto."
    exit 1
fi

# 2. Verificar se o script possui permissão de execução
if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Falha: O arquivo ligar_coolers.sh existe, mas não tem permissões de execução (chmod +x)."
    exit 1
fi

# 3. Verificar se o histórico de comandos existe
if [ ! -f "$HISTORY_FILE" ]; then
    echo "Falha: Histórico de comandos (.bash_history) não encontrado."
    exit 1
fi

# 4. Verificar se o script foi executado de fato
# Remove linhas com comandos comuns de edição, visualização e chmod, e busca a execução do script
if ! grep -v -E "chmod|cat|nano|vi|vim|ls|mv|cp|rm|echo" "$HISTORY_FILE" | grep -q "ligar_coolers.sh"; then
    echo "Falha: O arquivo ligar_coolers.sh está com a permissão correta, mas você ainda não o executou."
    exit 1
fi

echo "Sucesso: Os exaustores auxiliares foram ativados com sucesso e o fluxo de O2 no Bunker 7 foi normalizado!"
exit 0
