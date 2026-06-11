#!/bin/bash
mkdir -p /home/operator
cat << 'EOF' > /home/operator/users.csv
id,username,email,role
1,alice,alice@example.com,admin
2,bob,bob@example.com,user
3,charlie,charlie@example.com,user
EOF
chown -R operator:operator /home/operator
chmod 664 /home/operator/users.csv
