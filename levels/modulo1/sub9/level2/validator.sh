#!/bin/bash
if [ ! -f /home/operator/find_admins.sh ]; then
  echo "Error: /home/operator/find_admins.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/find_admins.sh ]; then
  echo "Error: /home/operator/find_admins.sh is not executable."
  exit 1
fi

# Run find_admins.sh as operator and clean output
output=$(su - operator -c "/home/operator/find_admins.sh" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
expected=$(cat << 'EOF'
1:alice:alice@example.com
4:david:david@example.com
EOF
)

if [ "$output" = "$expected" ]; then
  echo "Validation successful!"
  exit 0
else
  echo "Validation failed."
  echo "Expected:"
  echo "$expected"
  echo "Got:"
  echo "$output"
  exit 1
fi
