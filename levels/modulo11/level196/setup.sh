#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/ansible
chown -R operator:operator /home/operator 2>/dev/null || true
