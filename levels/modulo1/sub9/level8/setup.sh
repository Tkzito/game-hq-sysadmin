#!/bin/bash
mkdir -p /home/operator
cat << 'EOF' > /home/operator/users.csv
id,name,comment
1,"Alice Smith","Active, has access"
2,"Bob Jones","On vacation"
3,"Charlie Brown","Enjoys coding"
EOF
chown -R operator:operator /home/operator
chmod 644 /home/operator/users.csv
