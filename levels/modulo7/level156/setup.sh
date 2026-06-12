#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Load simulated images with api-server
cat << 'EOF' > /home/operator/.docker_state.json
{
  "containers": [],
  "images": [
    {
      "id": "a9b8c7d6e5f4",
      "repository": "api-server",
      "tag": "latest",
      "size": "200MB"
    }
  ]
}
EOF

chown -R operator:operator /home/operator
