#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/postgresql; echo 'max_connections = 100' > /etc/postgresql/postgresql.conf
chown -R operator:operator /home/operator 2>/dev/null || true
