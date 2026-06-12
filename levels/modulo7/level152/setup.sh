#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Load simulated images
cat << 'EOF' > /home/operator/.docker_state.json
{
  "containers": [],
  "images": [
    {
      "id": "d1a2b3c4d5e6",
      "repository": "legacy-app",
      "tag": "v0.1.0",
      "size": "500MB"
    },
    {
      "id": "f7a8b9c0d1e2",
      "repository": "redis",
      "tag": "latest",
      "size": "113MB"
    }
  ]
}
EOF

chown -R operator:operator /home/operator
