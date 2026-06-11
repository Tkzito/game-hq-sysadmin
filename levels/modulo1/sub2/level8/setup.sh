#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 18
set -euo pipefail

mkdir -p /home/operator

# Criar script de sincronização inseguro
cat << 'EOF' > /home/operator/sync.sh
#!/bin/bash

# TODO: Ative o Strict Mode do Bash aqui para evitar erros silenciosos:


# TODO: Declare a variavel PASTA_DESTINO apontando para "/home/operator/destino"
# (Se ela nao estiver declarada, o strict mode "set -u" vai abortar o script)


# Acoes do script:
mkdir -p "$PASTA_DESTINO"
echo "Sincronizando..."
cat /home/operator/origem.txt | grep -E "AURA" > "$PASTA_DESTINO/sync.txt"
echo "Sincronizacao concluida!"
EOF

echo "AURA SYSTEM ACTIVE" > /home/operator/origem.txt
chmod +x /home/operator/sync.sh
chown -R operator:operator /home/operator
