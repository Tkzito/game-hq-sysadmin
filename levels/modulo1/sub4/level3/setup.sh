#!/bin/bash
# setup.sh - Nível 33
set -euo pipefail

# Criar o script ping_target.sh que simula falhas de forma aleatória ou dependendo de um arquivo
# Para garantir validação previsível, vamos fazer ping_target.sh verificar a existência de um arquivo de simulação offline.
cat << 'EOF' > /home/operator/ping_target.sh
#!/bin/bash
if [ -f "/home/operator/simular_offline" ]; then
    exit 3
else
    exit 0
fi
EOF

chmod +x /home/operator/ping_target.sh

# Criar um esqueleto quebrado de check_service.sh para o jogador arrumar
cat << 'EOF' > /home/operator/check_service.sh
#!/bin/bash
# Script de monitoramento de integridade

/home/operator/ping_target.sh

# BUG: O jogador deve capturar o código de saída do ping_target.sh usando $?
# Atualmente ele está testando de forma fixa ou incorreta.
# Ajuste as linhas abaixo para verificar se o código de saída do ping_target.sh foi 0.
STATUS=0

if [ $STATUS -eq 0 ]; then
    echo "SERVICO ONLINE"
    exit 0
else
    echo "SERVICO OFFLINE"
    exit 1
fi
EOF

chmod +x /home/operator/check_service.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
