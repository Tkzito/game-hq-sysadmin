#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Clear state
echo '{"containers": [], "images": []}' > /home/operator/.docker_state.json

chown -R operator:operator /home/operator
