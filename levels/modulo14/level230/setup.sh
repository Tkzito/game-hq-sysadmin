#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/pgbouncer; echo 'database_host = 10.0.0.10' > /etc/pgbouncer/pgbouncer.ini
chown -R operator:operator /home/operator 2>/dev/null || true
