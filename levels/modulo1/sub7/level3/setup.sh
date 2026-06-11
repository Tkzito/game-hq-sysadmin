#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/db.conf
DB_NAME=core_db
PORT=3306
DB_USER=admin
EOF
