#!/bin/bash
# setup.sh - Nível 38
set -euo pipefail

# Criar o script solar_leak.sh
cat << 'EOF' > /home/operator/solar_leak.sh
#!/bin/bash
# Processo fantasma simulando vazamento de recursos
while true; do
    sleep 5
done
EOF

chmod +x /home/operator/solar_leak.sh

# Executar o processo fantasma em segundo plano
nohup /home/operator/solar_leak.sh >/dev/null 2>&1 &

# Criar o script de deploy que verifica se o processo solar_leak.sh está rodando
cat << 'EOF' > /home/operator/deploy.sh
#!/bin/bash
# Script de deploy automático de energia

# Verificar se solar_leak.sh ainda está ativo no sistema de processos
if ps aux | grep -v grep | grep -q "solar_leak.sh"; then
    echo "Erro: O processo solar_leak.sh está ativo travando a porta de controle!"
    exit 1
else
    echo "Nenhum processo conflitante encontrado."
    echo "Efetuando deploy..."
    echo "DEPLOY_STATUS=OK" > /home/operator/deploy_status.txt
    exit 0
fi
EOF

chmod +x /home/operator/deploy.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
