#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/ansible; echo '[web]' > /home/operator/ansible/hosts
chown -R operator:operator /home/operator 2>/dev/null || true
