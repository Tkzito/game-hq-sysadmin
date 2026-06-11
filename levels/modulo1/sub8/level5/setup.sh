#!/bin/bash
# setup.sh - Nível 75
set -euo pipefail

# Criar script ruidoso
cat << 'EOF' > /home/operator/sensor_noise.sh
#!/bin/bash
echo "DEBUG: Lendo sensor de ruído 1 - Valor 0.002"
echo "ERROR: Limiar de ruído excedido no canal 3" >&2
echo "DEBUG: Lendo sensor de ruído 2 - Valor 0.104"
EOF
chmod +x /home/operator/sensor_noise.sh
chown operator:operator /home/operator/sensor_noise.sh

# Configurar histórico vazio para o jogador começar limpo
touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
chown operator:operator /home/operator/.bash_history
