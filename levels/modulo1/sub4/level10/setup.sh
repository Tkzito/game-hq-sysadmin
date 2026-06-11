#!/bin/bash
# setup.sh - Nível 40
set -euo pipefail

# Criar a pasta de origem dos logs com espaço no nome para forçar necessidade de aspas
mkdir -p "/home/operator/logs solares"
echo "LOG DATA SOLAR 1" > "/home/operator/logs solares/geracao.log"

cat << 'EOF' > /home/operator/backup_solar.sh
#!/bin/bash
# backup_solar.sh - Script legado de backup de dados solares

# REQUISITO 1: Adicionar set -euo pipefail para segurança contra falhas e variáveis vazias.

# REQUISITO 2: Adicionar trap para limpar a pasta temporária de trabalho (/home/operator/tmp_backup) ao sair.
# DICA: defina uma função que apague a pasta e configure o trap para os sinais EXIT, INT e TERM.

TEMP_DIR="/home/operator/tmp_backup"
BACKUP_DIR="/home/operator/backup_solar"
DIR_LOGS="/home/operator/logs solares"

# Criar as pastas iniciais de trabalho
mkdir -p "$TEMP_DIR"

# BUG 3: Erro de sintaxe na verificação abaixo (falta fechar o colchete do teste if e a palavra-chave then).
if [ ! -d "$BACKUP_DIR"
    echo "Criando pasta de backup..."
    mkdir -p "$BACKUP_DIR"
fi

# BUG 4: Falta de aspas na variável $DIR_LOGS, gerando erro de Word Splitting (separação por espaços).
# Ajuste as variáveis para sempre possuírem aspas duplas: "$DIR_LOGS"
cp $DIR_LOGS/*.log "$TEMP_DIR/"

# Compactar os logs para a pasta de backup definitivo
tar -czf "$BACKUP_DIR/backup.tar.gz" -C "$TEMP_DIR" .

echo "Backup concluído com sucesso!"
EOF

chmod +x /home/operator/backup_solar.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
