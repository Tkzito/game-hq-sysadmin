#!/bin/bash
mkdir -p /home/operator
cat << 'EOF' > /home/operator/users.csv
id,username,dept_id
1,alice,10
2,bob,20
3,charlie,10
EOF

cat << 'EOF' > /home/operator/departments.csv
dept_id,dept_name
10,Engineering
20,Marketing
EOF

chown -R operator:operator /home/operator
chmod 644 /home/operator/users.csv /home/operator/departments.csv
