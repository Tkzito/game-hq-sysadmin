#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /etc/prometheus; echo 'scrape_configs: []' > /etc/prometheus/prometheus.yml
chown -R operator:operator /home/operator 2>/dev/null || true
