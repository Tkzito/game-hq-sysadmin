#!/bin/bash
set -euo pipefail

# Criar os scripts dummy a serem agendados
mkdir -p /opt/freshbox
echo -e '#!/bin/bash\necho "healthcheck"' > /opt/freshbox/healthcheck.sh
echo -e '#!/bin/bash\necho "backup"' > /opt/freshbox/backup.sh
chmod +x /opt/freshbox/healthcheck.sh /opt/freshbox/backup.sh

# Ajustar proprietário
chown -R operator:operator /opt/freshbox
chown -R operator:operator /home/operator
