#!/bin/bash
# setup.sh - Prepara o ambiente do Nível 1
set -euo pipefail

# Criar mensagem de boas-vindas do sistema
cat << 'EOF' > /home/operator/AVISO_SISTEMA.txt
==================================================
SISTEMA OPERACIONAL REBOOTADO EM MODO DE EMERGÊNCIA
==================================================
Integridade da IA AURA-7: 35% (Corrompida)
Terminal Neural: Aguardando resposta ativa...

Use o comando echo para enviar um sinal de teste.
EOF

chmod 644 /home/operator/AVISO_SISTEMA.txt
