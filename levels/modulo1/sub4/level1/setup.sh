#!/bin/bash
# setup.sh - Nível 31
set -euo pipefail

cat << 'EOF' > /home/operator/reboot.sh
#!/bin/bash
# Script de reinicializacao critica do painel solar

if [ "$1" = "force" ]
    echo "Forçando reboot..."
else
    echo "Reboot normal..."
fi

for i in 3 2 1
do
    echo "Contagem: $i"
# Erro aqui: Falta o "done" do laço for
EOF

chmod +x /home/operator/reboot.sh

touch /home/operator/.bash_history
chmod 644 /home/operator/.bash_history
