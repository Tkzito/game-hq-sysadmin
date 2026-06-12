#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/ansible; echo 'senha_db = 1234' > /home/operator/ansible/credentials.yml
chown -R operator:operator /home/operator 2>/dev/null || true
