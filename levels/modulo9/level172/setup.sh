#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/nginx/conf.d; echo 'server { listen 80; location /api { } }' > /etc/nginx/conf.d/default.conf
chown -R operator:operator /home/operator 2>/dev/null || true
