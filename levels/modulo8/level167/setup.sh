#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create cluster_events.json file for forensic grep
cat << 'EOF' > /home/operator/cluster_events.json
{"timestamp": "2026-06-11 02:00:15", "level": "INFO", "component": "node-manager", "message": "Node eco-node-1 heartbeat received."}
{"timestamp": "2026-06-11 02:05:33", "level": "WARNING", "component": "api-server", "message": "High latency on telemetry-gateway-55a2c3-1."}
{"timestamp": "2026-06-11 02:15:10", "level": "SECURITY_VIOLATION", "component": "audit-log", "message": "Unauthorized modification of energy_routing_key by digital signature 0xEF92A31B8C from external network."}
{"timestamp": "2026-06-11 02:20:00", "level": "INFO", "component": "scheduler", "message": "Scheduled telemetry-gateway-55a2c3-2 to eco-node-2."}
EOF

rm -f /home/operator/violation.txt
rm -f /home/operator/.cluster_usage
touch /home/operator/.cluster_usage

chown -R operator:operator /home/operator
