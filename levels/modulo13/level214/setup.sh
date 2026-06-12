#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/prometheus; echo 'groups: []' > /etc/prometheus/rules.yml
chown -R operator:operator /home/operator 2>/dev/null || true
