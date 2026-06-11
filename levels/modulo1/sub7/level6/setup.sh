#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/app.ini
[database]
db_host=db.local
db_port=5432

[api]
api_key=xyz123
api_url=https://api.local
EOF
touch /home/operator/obter_db.sh
chmod +x /home/operator/obter_db.sh
