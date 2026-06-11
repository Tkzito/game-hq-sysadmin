#!/bin/bash
# setup.sh - Nível 36
set -euo pipefail

# Criar a pasta de destino
mkdir -p /home/operator/dest

# Criar a pasta de origem e arquivo txt
mkdir -p /home/operator/source
echo "versao=1.0" > /home/operator/source/app.txt

cat << 'EOF' > /home/operator/deploy.sh
#!/bin/bash
# Script de Deploy de Configurações da Estação

# BUG 1: Adicione 'set -euo pipefail' nas primeiras linhas para ativar o modo de depuração estrita.
# Atualmente, se um comando falhar ou uma variável estiver indefinida, o script continua fingindo sucesso.

# BUG 2: A variável SOURCE_DIR não está definida! Defina-a com o caminho "/home/operator/source"
# SOURCE_DIR=

# Copiar os arquivos txt da origem para o destino
cp $SOURCE_DIR/*.txt /home/operator/dest/

echo "Deploy concluído com sucesso!"
EOF

chmod +x /home/operator/deploy.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
