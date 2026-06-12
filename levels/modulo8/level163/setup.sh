#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create initial deployment manifest with 2 replicas
cat << 'EOF' > /home/operator/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: telemetry-gateway
  labels:
    app: telemetry
spec:
  replicas: 2
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

chown -R operator:operator /home/operator
