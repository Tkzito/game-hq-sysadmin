#!/bin/bash
if [ ! -f /home/operator/get_sales.sh ]; then
  echo "Error: /home/operator/get_sales.sh is missing."
  exit 1
fi

if [ ! -x /home/operator/get_sales.sh ]; then
  echo "Error: /home/operator/get_sales.sh is not executable."
  exit 1
fi

# Run for 2026-06-11
out1=$(su - operator -c "/home/operator/get_sales.sh 2026-06-11" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
expected1=$(cat << 'EOF'
Widget B:200.00
Widget C:50.00
EOF
)

if [ "$out1" != "$expected1" ]; then
  echo "Validation failed for date 2026-06-11."
  echo "Expected:"
  echo "$expected1"
  echo "Got:"
  echo "$out1"
  exit 1
fi

# Run for 2026-06-10
out2=$(su - operator -c "/home/operator/get_sales.sh 2026-06-10" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
expected2="Widget A:100.50"

if [ "$out2" != "$expected2" ]; then
  echo "Validation failed for date 2026-06-10."
  echo "Expected:"
  echo "$expected2"
  echo "Got:"
  echo "$out2"
  exit 1
fi

echo "Validation successful!"
exit 0
