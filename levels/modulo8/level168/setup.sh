#!/bin/bash
set -euo pipefail

mkdir -p /home/operator

# Create traffic.log with attacker IP 203.0.113.199 repeated 1200 times
# and other random IPs
python3 -c "
import random
ips = ['192.168.1.10', '10.0.0.5', '172.16.0.4', '8.8.8.8']
attacker = '203.0.113.199'
with open('/home/operator/traffic.log', 'w') as f:
    for _ in range(300):
        f.write(f'{random.choice(ips)} - - [12/Jun/2026:10:00:00 +0000] \"GET /api/v1/status HTTP/1.1\" 200 128\n')
    for _ in range(1200):
        f.write(f'{attacker} - - [12/Jun/2026:10:01:00 +0000] \"GET /api/v1/telemetry HTTP/1.1\" 503 0\n')
    for _ in range(200):
        f.write(f'{random.choice(ips)} - - [12/Jun/2026:10:02:00 +0000] \"GET /api/v1/status HTTP/1.1\" 200 128\n')
"

# Clear firewall mock rules
rm -f /home/operator/.ufw_rules
rm -f /home/operator/.ufw_usage
touch /home/operator/.ufw_rules
touch /home/operator/.ufw_usage

chown -R operator:operator /home/operator
