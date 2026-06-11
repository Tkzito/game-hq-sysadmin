#!/bin/bash
if [ ! -f /home/operator/update_role.sh ]; then
  echo "Error: /home/operator/update_role.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/update_role.sh ]; then
  echo "Error: /home/operator/update_role.sh is not executable."
  exit 1
fi

# Update bob's role to admin
su - operator -c "/home/operator/update_role.sh bob admin"
if [ $? -ne 0 ]; then
  echo "Error: Failed to run update_role.sh for bob"
  exit 1
fi

# Update alice's role to user
su - operator -c "/home/operator/update_role.sh alice user"
if [ $? -ne 0 ]; then
  echo "Error: Failed to run update_role.sh for alice"
  exit 1
fi

# Check the file contents
content=$(cat /home/operator/users.csv | tr -d '\r')
expected=$(cat << 'EOF'
id,username,email,role
1,alice,alice@example.com,user
2,bob,bob@example.com,admin
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
