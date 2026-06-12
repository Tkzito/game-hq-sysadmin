#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create initial deployment yaml (few replicas, no probes, no memory limits)
cat << 'EOF' > /home/operator/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: telemetry-gateway
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

# Load cluster state: eco-node-2 is down, telemetry-gateway-55a2c3-2 is crashing on eco-node-2
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
      "status": "NotReady",
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
  "pods": [
    {
      "name": "telemetry-gateway-55a2c3-1",
      "ready": "1/1",
      "status": "Running",
      "restarts": 0,
      "age": "1h"
    },
    {
      "name": "telemetry-gateway-55a2c3-2",
      "ready": "0/1",
      "status": "CrashLoopBackOff",
      "restarts": 15,
      "age": "1h"
    }
  ]
}
EOF

# Create traffic.log with attacker IP 198.51.100.72
python3 -c "
import random
ips = ['10.0.0.10', '192.168.1.15', '172.16.5.2']
attacker = '198.51.100.72'
with open('/home/operator/traffic.log', 'w') as f:
    for _ in range(200):
        f.write(f'{random.choice(ips)} - - [12/Jun/2026:10:00:00 +0000] \"GET / HTTP/1.1\" 200 512\n')
    for _ in range(1500):
        f.write(f'{attacker} - - [12/Jun/2026:10:01:00 +0000] \"POST /telemetry HTTP/1.1\" 503 0\n')
    for _ in range(100):
        f.write(f'{random.choice(ips)} - - [12/Jun/2026:10:02:00 +0000] \"GET / HTTP/1.1\" 200 512\n')
"

# Clear firewall mock
rm -f /home/operator/.ufw_rules
rm -f /home/operator/.ufw_usage
touch /home/operator/.ufw_rules
touch /home/operator/.ufw_usage

# Clear cluster usage
rm -f /home/operator/.cluster_usage
touch /home/operator/.cluster_usage

chown -R operator:operator /home/operator
