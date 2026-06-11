#!/bin/bash
if [ ! -f /home/operator/parse_complex.sh ]; then
  echo "Error: /home/operator/parse_complex.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/parse_complex.sh ]; then
  echo "Error: /home/operator/parse_complex.sh is not executable."
  exit 1
fi

# Run parse_complex.sh as operator
output=$(su - operator -c "/home/operator/parse_complex.sh" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
expected=$(cat << 'EOF'
1:Alice Smith:Active, has access
2:Bob Jones:On vacation
3:Charlie Brown:Enjoys coding
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
