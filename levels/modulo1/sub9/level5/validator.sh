#!/bin/bash
if [ ! -f /home/operator/delete_user.sh ]; then
  echo "Error: /home/operator/delete_user.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/delete_user.sh ]; then
  echo "Error: /home/operator/delete_user.sh is not executable."
  exit 1
fi

# Run delete_user.sh for ID 2 as operator
su - operator -c "/home/operator/delete_user.sh 2"
if [ $? -ne 0 ]; then
  echo "Error: Failed to run delete_user.sh"
  exit 1
fi

# Read the file
content=$(cat /home/operator/users.csv | tr -d '\r')
expected=$(cat << 'EOF'
id,username,email,role
1,alice,alice@example.com,admin
3,charlie,charlie@example.com,user
EOF
)

if [ "$content" = "$expected" ]; then
  echo "Validation successful!"
  exit 0
else
  echo "Validation failed."
  echo "Expected:"
  echo "$expected"
  echo "Got:"
  echo "$content"
  exit 1
fi
