#!/bin/bash
if [ ! -f /home/operator/add_user.sh ]; then
  echo "Error: /home/operator/add_user.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/add_user.sh ]; then
  echo "Error: /home/operator/add_user.sh is not executable."
  exit 1
fi

# Run add_user.sh twice as operator
su - operator -c "/home/operator/add_user.sh frank frank@example.com user"
if [ $? -ne 0 ]; then
  echo "Error: Failed to run add_user.sh for frank"
  exit 1
fi

su - operator -c "/home/operator/add_user.sh grace grace@example.com admin"
if [ $? -ne 0 ]; then
  echo "Error: Failed to run add_user.sh for grace"
  exit 1
fi

# Read the file
content=$(cat /home/operator/users.csv | tr -d '\r')
expected=$(cat << 'EOF'
id,username,email,role
1,alice,alice@example.com,admin
2,bob,bob@example.com,user
3,frank,frank@example.com,user
4,grace,grace@example.com,admin
EOF
)

if [ "$content" = "$expected" ]; then
  echo "Validation successful!"
  exit 0
else
  echo "Validation failed. File content does not match expected."
  echo "Expected:"
  echo "$expected"
  echo "Got:"
  echo "$content"
  exit 1
fi
