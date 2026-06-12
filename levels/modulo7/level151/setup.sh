#!/bin/bash
set -euo pipefail

# Initialize docker state
mkdir -p /home/operator
echo '{"containers": [], "images": []}' > /home/operator/.docker_state.json

chown -R operator:operator /home/operator
