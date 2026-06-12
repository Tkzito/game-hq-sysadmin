#!/bin/bash
set -euo pipefail

mkdir -p /home/operator
# Load simulated images with mysql
cat << 'EOF' > /home/operator/.docker_state.json
{
  "containers": [],
  "images": [
    {
      "id": "a1b2c3d4e5f6",
      "repository": "mysql",
      "tag": "latest",
      "size": "450MB"
    }
  ]
}
EOF

# Ensure operator has rights to create the volume folder or create it for them
# To make it realistic, the player might need to run the command, but let's create the folder and give access to operator
mkdir -p /var/data/mysql
chown -R operator:operator /var/data/mysql
chown -R operator:operator /home/operator
