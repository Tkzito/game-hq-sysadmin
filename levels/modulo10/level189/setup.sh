#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/infra
chown -R operator:operator /home/operator 2>/dev/null || true
