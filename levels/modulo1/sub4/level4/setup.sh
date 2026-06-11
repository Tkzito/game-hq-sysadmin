#!/bin/bash
# setup.sh - Nível 34
set -euo pipefail

cat << 'EOF' > /home/operator/diagnostico.sh
#!/bin/bash
# Script de diagnóstico interativo

# Escreva o comando read usando a opção -p para exibir a mensagem abaixo para o operador:
# "Deseja iniciar o diagnostico? (SIM/NAO): "
# E armazene na variável RESPOSTA

# DICA: preencha esta linha abaixo
# read -p "..." RESPOSTA

# Substitua a verificação abaixo para avaliar a variável RESPOSTA
RESPOSTA=""

if [ "$RESPOSTA" = "SIM" ]; then
    echo "Iniciando Diagnóstico..."
    exit 0
elif [ "$RESPOSTA" = "NAO" ]; then
    echo "Diagnóstico Cancelado"
    exit 0
else
    echo "Entrada Inválida"
    exit 1
fi
EOF

chmod +x /home/operator/diagnostico.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
