#!/bin/bash
# validator.sh - Nível 37
set -euo pipefail

SCRIPT="/home/operator/check_ports.sh"
LOG_FILE="/home/operator/error.log"

# 1. Garantir que o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não foi encontrado."
    exit 1
fi

# Limpar log anterior para teste limpo
rm -f "$LOG_FILE"

# 2. Executar o script e capturar stdout e stderr separadamente
stdout=$(bash "$SCRIPT" 2>/dev/null)
stderr=$(bash "$SCRIPT" 2>&1 >/dev/null)

# 3. Validar se a saída de erro da tela ficou vazia
if [ -n "$stderr" ]; then
    echo "Erro: O script ainda imprimiu mensagens de erro no terminal (stderr não foi totalmente redirecionado)."
    exit 1
fi

# 4. Verificar se o arquivo de log foi criado
if [ ! -f "$LOG_FILE" ]; then
    echo "Erro: O arquivo de log '$LOG_FILE' não foi criado."
    exit 1
fi

# 5. Validar o conteúdo do arquivo de log
if ! grep -q "\[AVISO\] Porta 22 com conexão instável" "$LOG_FILE" || ! grep -q "\[ERRO\] Porta 443 recusou a conexão" "$LOG_FILE"; then
    echo "Erro: As mensagens de erro redirecionadas para o log estão ausentes ou incorretas."
    exit 1
fi

# 6. Validar se stdout continua imprimindo na tela
if ! echo "$stdout" | grep -q "Iniciando varredura..." || ! echo "$stdout" | grep -q "Porta 80: Aberta"; then
    echo "Erro: A saída padrão legítima (stdout) sumiu ou foi desviada incorretamente."
    exit 1
fi

echo "Parabéns! Você redirecionou com sucesso a saída de erro (stderr) para o arquivo log mantendo o console limpo!"
exit 0
