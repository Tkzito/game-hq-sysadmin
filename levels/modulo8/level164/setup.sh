#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create deployment manifest with 5 replicas
cat << 'EOF' > /home/operator/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: telemetry-gateway
  labels:
    app: telemetry
spec:
  replicas: 5
  selector:
    matchLabels:
      app: telemetry
  template:
    metadata:
      labels:
        app: telemetry
    spec:
      containers:
      - name: gateway
        image: ecogrid/telemetry-gateway:v1.0.0
        ports:
        - containerPort: 8080
EOF

# Initial cluster state with no pods
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
      "status": "Ready",
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
