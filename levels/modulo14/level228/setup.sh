#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/redis; echo 'sentinel monitor' > /etc/redis/sentinel.conf
chown -R operator:operator /home/operator 2>/dev/null || true
