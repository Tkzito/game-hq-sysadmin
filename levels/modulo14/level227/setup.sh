#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/redis; echo 'port 6379' > /etc/redis/redis.conf
chown -R operator:operator /home/operator 2>/dev/null || true
