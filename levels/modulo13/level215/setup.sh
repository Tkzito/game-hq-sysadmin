#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/promtail; echo 'server: {}' > /etc/promtail/promtail.yml
chown -R operator:operator /home/operator 2>/dev/null || true
