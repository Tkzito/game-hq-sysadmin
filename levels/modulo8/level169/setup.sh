#!/bin/bash
set -euo pipefail

mkdir -p /home/operator/.ssh
chmod 700 /home/operator/.ssh

# Write authorized keys (legitimate and obsolete keys)
cat << 'EOF' > /home/operator/.ssh/authorized_keys
ssh-rsa AAAAB3Nza1yc2EAAAADAQABAAABAQC3operatorKeyHere... operator@ecogrid-solar.org
ssh-rsa AAAAB3Nza1yc2EAAAADAQABAAABAQC9janelaosKeyHere... admin@janelaos.com
EOF

chmod 600 /home/operator/.ssh/authorized_keys
chown -R operator:operator /home/operator

echo "SSH setup finished."
