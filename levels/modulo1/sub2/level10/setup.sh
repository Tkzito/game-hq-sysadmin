#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 20
set -euo pipefail

mkdir -p /home/operator

# Criar script deploy.sh com instruções
cat << 'EOF' > /home/operator/deploy.sh
# Corrija este script de deploy aplicando as boas praticas aprendidas:
# 1. Adicione a Shebang do bash na primeira linha.
# 2. Ative o modo estrito de segurança do Bash (set -euo pipefail).
# 3. Defina a variável APP_VERSION="2.0.1".
# 4. Copie o arquivo /home/operator/app.log para /home/operator/app_backup.log.
# 5. Adicione tratamento de erro ($?) ao cp: se falhar, saia com exit 1.
# 6. Se tiver sucesso, imprima "Deploy APP_VERSION concluido" (interpole a variável) e saia com exit 0.

cp /home/operator/app.log /home/operator/app_backup.log

EOF

echo "Log de inicializacao da app..." > /home/operator/app.log
chmod +x /home/operator/deploy.sh
chown -R operator:operator /home/operator
