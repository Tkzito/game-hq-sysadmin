#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/nginx; echo 'server { }' > /etc/nginx/nginx.conf
chown -R operator:operator /home/operator 2>/dev/null || true
