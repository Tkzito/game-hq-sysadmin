#!/bin/bash
set -euo pipefail
mkdir -p /home/operator; echo '<h1>Fintech landing page</h1>' > /home/operator/index.html
chown -R operator:operator /home/operator 2>/dev/null || true
