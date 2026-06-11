#!/bin/bash
# setup.sh - Nível 80
set -euo pipefail

# Criar arquivo de configuração bruto
cat << 'EOF' > /home/operator/config_raw.txt
hostname=auraportal
env=prod
version=7.0
EOF

# Criar script processador que consome entrada padrão (stdin)
cat << 'EOF' > /home/operator/processador.sh
#!/bin/bash
while read -r line; do
    if [ -n "$line" ]; then
        echo "CONF_$(echo "$line" | tr '[:lower:]' '[:upper:]')"
    fi
done
EOF

chmod 644 /home/operator/config_raw.txt
chmod +x /home/operator/processador.sh

chown operator:operator /home/operator/config_raw.txt
chown operator:operator /home/operator/processador.sh

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
