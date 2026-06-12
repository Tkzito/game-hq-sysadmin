#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create initial docker state with queue-worker container running
cat << 'EOF' > /home/operator/.docker_state.json
{
  "containers": [
    {
      "id": "e4f8d9c2e0b1",
      "name": "queue-worker",
      "image": "worker:latest",
      "status": "Up 5 hours (unstable)",
      "ports": "",
      "created": "5 hours ago",
      "env": {},
      "volumes": []
    }
  ],
  "images": [
    {
      "id": "abc123xyz890",
      "repository": "worker",
      "tag": "latest",
      "size": "320MB"
    }
  ]
}
EOF

# Ensure we have a clean usage log
rm -f /home/operator/.docker_usage
touch /home/operator/.docker_usage

chown -R operator:operator /home/operator
