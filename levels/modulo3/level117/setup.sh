#!/bin/bash
set -euo pipefail

# Cria o script de backup dental
cat << 'EOF' > /usr/local/bin/backup_dental.sh
#!/bin/bash
while true; do
    echo "Backup dental em andamento..." >> /var/log/backup_dental.log
    sleep 2
done
EOF
chmod +x /usr/local/bin/backup_dental.sh

# Remove logs antigos se houver
rm -f /var/log/backup_dental.log
rm -f /home/operator/nohup.out

chown -R operator:operator /home/operator
