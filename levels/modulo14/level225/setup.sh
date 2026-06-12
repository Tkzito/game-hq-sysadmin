#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/pgbouncer; echo 'pool_mode = session' > /etc/pgbouncer/pgbouncer.ini
chown -R operator:operator /home/operator 2>/dev/null || true
