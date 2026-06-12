#!/bin/bash
set -euo pipefail

# Criar mock do curl para simular um serviço que demora para subir
rm -f /tmp/curl_attempts
cat << 'EOF' > /usr/local/bin/curl
#!/bin/bash
if [[ "$*" == *"http://app01.freshbox.internal/health"* ]]; then
    count=0
    if [ -f /tmp/curl_attempts ]; then
        count=$(cat /tmp/curl_attempts)
    fi
    count=$((count + 1))
    echo "$count" > /tmp/curl_attempts
    
    if [ "$count" -lt 3 ]; then
        # Falha nas primeiras 2 tentativas
        exit 22
    else
        # Sucesso da terceira tentativa em diante
        echo "OK"
        exit 0
    fi
fi
# Repassar para o curl original caso não seja a URL de monitoramento
/usr/bin/curl "$@"
EOF
chmod +x /usr/local/bin/curl

chown -R operator:operator /home/operator
