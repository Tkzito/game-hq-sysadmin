#!/bin/bash
set -euo pipefail
mkdir -p /home/operator; echo 'aws ec2 run-instances --security-groups default' > /home/operator/deploy.sh
chown -R operator:operator /home/operator 2>/dev/null || true
