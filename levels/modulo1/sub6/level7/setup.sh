#!/bin/bash
set -euo pipefail
cat << 'EOF' > /home/operator/config_sujeira.conf
HOST=localhost

PORT=5432
  
DB_USER=aura
	
DB_PASS=secret123
EOF
