#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/ansible/group_vars /home/operator/ansible/host_vars
chown -R operator:operator /home/operator 2>/dev/null || true
