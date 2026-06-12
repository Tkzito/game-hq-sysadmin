#!/bin/bash
set -euo pipefail

# Criar mock de ssh para interceptar chamadas
cat << 'EOF' > /usr/local/bin/ssh
#!/bin/bash
if [[ "$*" == *"df -h"* ]]; then
  echo "/dev/sda1        40G   15G   25G  38% /"
  exit 0
fi
echo "Mock SSH: $*"
exit 0
EOF
chmod +x /usr/local/bin/ssh

# Garantir permissões do operator
chown -R operator:operator /home/operator
