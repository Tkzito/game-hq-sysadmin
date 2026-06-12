#!/bin/bash
set -euo pipefail

# Criar pasta de logs e dar permissões
mkdir -p /var/log/freshbox
touch /var/log/freshbox/failures.log
chmod 777 /var/log/freshbox/failures.log

# Mock do curl para testes lógicos de rede fictícios
cat << 'EOF' > /usr/local/bin/curl
#!/bin/bash
if [[ "$*" == *"app01"* ]] || [[ "$*" == *"app02"* ]]; then
    exit 0
elif [[ "$*" == *"db01"* ]]; then
    exit 1
fi
/usr/bin/curl "$@"
EOF
chmod +x /usr/local/bin/curl

chown -R operator:operator /var/log/freshbox
chown -R operator:operator /home/operator
