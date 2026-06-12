#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create initial deployment yaml without probes
cat << 'EOF' > /home/operator/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: telemetry-gateway
spec:
  replicas: 3
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

# Load cluster state with one pod crashing
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
    }
  ],
  "pods": [
    {
      "name": "telemetry-gateway-55a2c3-1",
      "ready": "1/1",
      "status": "Running",
      "restarts": 0,
      "age": "2h"
    },
    {
      "name": "telemetry-gateway-55a2c3-2",
      "ready": "1/1",
      "status": "Running",
      "restarts": 0,
      "age": "2h"
    },
    {
      "name": "telemetry-gateway-55a2c3-3",
      "ready": "0/1",
      "status": "CrashLoopBackOff",
      "restarts": 12,
      "age": "2h"
    }
  ]
}
EOF

rm -f /home/operator/.cluster_usage
touch /home/operator/.cluster_usage

chown -R operator:operator /home/operator
