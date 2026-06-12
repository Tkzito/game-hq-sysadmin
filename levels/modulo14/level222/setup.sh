#!/bin/bash
set -euo pipefail
mkdir -p /home/operator /var/lib/postgresql/data
chown -R operator:operator /home/operator 2>/dev/null || true
