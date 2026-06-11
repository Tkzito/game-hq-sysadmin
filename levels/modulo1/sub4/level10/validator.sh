#!/bin/bash
# validator.sh - Nível 40
set -euo pipefail

SCRIPT="/home/operator/backup_solar.sh"
TEMP_DIR="/home/operator/tmp_backup"
BACKUP_TAR="/home/operator/backup_solar/backup.tar.gz"

# 1. Garantir que o script existe
if [ ! -f "$SCRIPT" ]; then
    echo "Erro: O arquivo '$SCRIPT' não foi encontrado."
    exit 1
fi

# 2. Verificar se set -euo pipefail (ou set -eu) foi configurado no script
if ! grep -E -q "set\s+-.*e" "$SCRIPT" || ! grep -E -q "set\s+-.*u" "$SCRIPT"; then
    echo "Erro: O script deve ativar a depuração estrita com 'set -e' e 'set -u'."
    exit 1
fi

# 3. Verificar se o comando trap foi declarado para limpeza
if ! grep -q "trap\s" "$SCRIPT"; then
    echo "Erro: O script não implementou um 'trap' para autolimpeza da pasta temporária."
    exit 1
fi

# Limpar vestígios anteriores
rm -rf "$TEMP_DIR"
rm -f "$BACKUP_TAR"

# 4. Executar o script do usuário e capturar o retorno
output=$(bash "$SCRIPT" 2>&1)
exit_code=$?

if [ "$exit_code" -ne 0 ]; then
    echo "Erro: O script falhou durante a execução (código de saída $exit_code). Verifique se corrigiu a sintaxe do if e as aspas das variáveis."
    exit 1
fi

# 5. Verificar se a pasta temporária foi apagada pelo trap
if [ -d "$TEMP_DIR" ]; then
    echo "Erro: O diretório temporário '$TEMP_DIR' ainda existe. O trap não foi disparado ou falhou na exclusão."
    exit 1
fi

# 6. Validar o arquivo compactado de backup definitivo
if [ ! -f "$BACKUP_TAR" ]; then
    echo "Erro: O arquivo compactado de backup final não foi gerado em '$BACKUP_TAR'."
    exit 1
fi

# 7. Validar se o conteúdo do backup contém geracao.log
if ! tar -tzf "$BACKUP_TAR" | grep -q "geracao.log"; then
    echo "Erro: O log 'geracao.log' não foi copiado e empacotado no backup solar."
    exit 1
fi

echo "Parabéns! Você realizou uma auditoria completa de depuração, garantindo aspas contra Word Splitting, tratamento com trap, depuração estrita com set -eu e tratamento de erros sintáticos!"
exit 0
