#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Initial cluster state with eco-node-3 NotReady
cat << 'EOF' > /home/operator/.cluster_state.json
{
  "nodes": [
    {
      "name": "eco-node-1",
      "status": "Ready",
      "role": "control-plane",
      "version": "v1.25.0"
    },
    {
      "name": "eco-node-2",
      "status": "Ready",
      "role": "worker",
      "version": "v1.25.0"
    },
    {
      "name": "eco-node-3",
      "status": "NotReady",
      "role": "worker",
      "version": "v1.25.0"
    }
  ],
  "pods": []
}
EOF

rm -f /home/operator/.cluster_usage
touch /home/operator/.cluster_usage

chown -R operator:operator /home/operator
