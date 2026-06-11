#!/bin/bash
# setup.sh - Nível 21
set -euo pipefail

# Criar estrutura original
mkdir -p /home/operator/dados_originais

# Criar arquivos com atributos específicos
cat << 'EOF' > /home/operator/dados_originais/sistema.conf
# Arquivo de configuracao critico
PORT=8080
DB_HOST=localhost
EOF

cat << 'EOF' > /home/operator/dados_originais/chave_acesso.key
# Chave de criptografia de dados
BASE64_KEY=c3VwZXJzZWNyZXRrZXk=
EOF

# Aplicar permissões e timestamps restritos
chmod 600 /home/operator/dados_originais/sistema.conf
chmod 400 /home/operator/dados_originais/chave_acesso.key

# Alterar a data de modificação dos arquivos para o passado
touch -d "2023-01-01 12:00:00" /home/operator/dados_originais/sistema.conf
touch -d "2023-01-01 12:00:00" /home/operator/dados_originais/chave_acesso.key

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
