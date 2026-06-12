#!/bin/bash
set -euo pipefail

# Cria a pasta para servir arquivos
mkdir -p /var/www

cat << 'EOF' > /var/www/diagnostico.sh
#!/bin/bash
echo "=== Diagnostico de Rede São Luís ==="
echo "Todas as interfaces locais estao operando normalmente."
EOF
chmod +x /var/www/diagnostico.sh

echo '{"status":"healthy"}' > /var/www/health

# Finaliza qualquer servidor python anterior se houver
pkill -f "http.server 8080" || true

# Inicia o servidor web python em background
nohup python3 -m http.server 8080 --directory /var/www >/dev/null 2>&1 &

# Limpa a home do operator
rm -f /home/operator/diagnostico.sh
rm -f /home/operator/health.json

chown -R operator:operator /home/operator
