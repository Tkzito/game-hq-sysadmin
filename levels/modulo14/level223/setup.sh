#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/postgresql; echo 'hot_standby = off' > /etc/postgresql/postgresql.conf
chown -R operator:operator /home/operator 2>/dev/null || true
