#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 17
set -euo pipefail

mkdir -p /home/operator

# Criar script de backup inicial sem tratamento de exit code
cat << 'EOF' > /home/operator/backup_db.sh
#!/bin/bash
# Tenta copiar o banco de dados
cp /home/operator/banco_original.db /home/operator/db.backup 2>/dev/null

# TODO: Adicione uma verificação do exit status ($?) do comando cp anterior.
# Se o comando falhou (status diferente de 0), saia com exit 1.
# Se funcionou, imprima "Backup concluido" e saia com exit 0.


EOF

chmod +x /home/operator/backup_db.sh
chown -R operator:operator /home/operator
