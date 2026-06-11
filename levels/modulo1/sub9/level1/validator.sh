#!/bin/bash
# Check if script exists
if [ ! -f /home/operator/parse.sh ]; then
  echo "Error: /home/operator/parse.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/parse.sh ]; then
  echo "Error: /home/operator/parse.sh is not executable."
  exit 1
fi

# Run parse.sh as operator and clean output (remove carriage returns, leading/trailing whitespace)
output=$(su - operator -c "/home/operator/parse.sh" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
expected=$(cat << 'EOF'
alice:alice@example.com
bob:bob@example.com
charlie:charlie@example.com
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
