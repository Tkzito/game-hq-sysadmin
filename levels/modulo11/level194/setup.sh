#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/ansible; echo '' > /home/operator/ansible/site.yml
chown -R operator:operator /home/operator 2>/dev/null || true
