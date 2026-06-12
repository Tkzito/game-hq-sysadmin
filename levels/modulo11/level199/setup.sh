#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/ansible; echo '[defaults]' > /home/operator/ansible/ansible.cfg
chown -R operator:operator /home/operator 2>/dev/null || true
