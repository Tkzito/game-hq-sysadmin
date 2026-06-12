#!/bin/bash
set -euo pipefail

# Cria o binario de radiologia_sync
cat << 'EOF' > /usr/local/bin/radiologia_sync
#!/bin/bash
# Simula processo de radiologia
while true; do
    sleep 0.1
done
EOF
chmod +x /usr/local/bin/radiologia_sync

# Executa o processo como operator em background
nohup su - operator -c "exec -a radiologia_sync /usr/local/bin/radiologia_sync" >/dev/null 2>&1 &

# Atualiza os indices do apt para que a instalacao funcione direto
apt-get update || true

chown -R operator:operator /home/operator
