#!/bin/bash
set -euo pipefail
mkdir -p /home/operator/infra; echo '' > /home/operator/infra/main.tf
chown -R operator:operator /home/operator 2>/dev/null || true
