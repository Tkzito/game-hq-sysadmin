#!/bin/bash
set -euo pipefail

# Cria os diretorios e o arquivo secreto de prontuario
mkdir -p /var/data/pacientes/prontuarios
echo "dados confidenciais de pacientes" > /var/data/pacientes/prontuarios/prontuario_secreto.db
chown -R operator:operator /var/data/pacientes

# Cria o binario de radiologia_sync que abre o arquivo secreto em um FD
cat << 'EOF' > /usr/local/bin/radiologia_sync
#!/bin/bash
# Abre o arquivo no descritor de arquivo 3
exec 3< /var/data/pacientes/prontuarios/prontuario_secreto.db
while true; do
    sleep 0.5
done
EOF
chmod +x /usr/local/bin/radiologia_sync

# Inicia o processo em background
nohup su - operator -c "exec -a radiologia_sync /usr/local/bin/radiologia_sync" >/dev/null 2>&1 &

chown -R operator:operator /home/operator
