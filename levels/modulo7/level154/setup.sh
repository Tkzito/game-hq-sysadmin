#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Load simulated images with app:v1
cat << 'EOF' > /home/operator/.docker_state.json
{
  "containers": [],
  "images": [
    {
      "id": "e9a8b7c6d5e4",
      "repository": "app",
      "tag": "v1",
      "size": "150MB"
    }
  ]
}
EOF

chown -R operator:operator /home/operator
