#!/bin/bash
if [ ! -f /home/operator/join_data.sh ]; then
  echo "Error: /home/operator/join_data.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/join_data.sh ]; then
  echo "Error: /home/operator/join_data.sh is not executable."
  exit 1
fi

# Run join_data.sh as operator and clean output
output=$(su - operator -c "/home/operator/join_data.sh" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
expected=$(cat << 'EOF'
alice:Engineering
bob:Marketing
charlie:Engineering
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
