#!/bin/bash

SCRIPT="/home/operator/ask_name.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Set up mock dialog
MOCK_DIR=$(mktemp -d)
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
if [[ "$*" == *"--stdout"* ]]; then
    echo "Commander_Shepard"
else
    echo "Commander_Shepard" >&2
fi
exit 0
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /tmp/dialog_calls.txt
rm -f /home/operator/name.txt

# Run user script
export PATH="$MOCK_DIR:$PATH"
"$SCRIPT" 2>/dev/null

rm -rf "$MOCK_DIR"

if [ ! -f /home/operator/name.txt ]; then
    echo "ERROR: /home/operator/name.txt was not created."
    exit 1
fi

NAME_VAL=$(cat /home/operator/name.txt | tr -d '\n' | tr -d '\r')
if [ "$NAME_VAL" != "Commander_Shepard" ]; then
    echo "ERROR: Expected name.txt to contain 'Commander_Shepard', but got '$NAME_VAL'."
    exit 1
fi

CALL_DETAILS=$(cat /tmp/dialog_calls.txt)
rm -f /tmp/dialog_calls.txt

if ! echo "$CALL_DETAILS" | grep -F "Authentication" >/dev/null; then
    echo "ERROR: Dialog title 'Authentication' not found."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -F "Enter operator name:" >/dev/null; then
    echo "ERROR: Dialog text 'Enter operator name:' not found."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -E '8 40|8  40' >/dev/null; then
    echo "ERROR: Dialog dimensions must be 8 (height) and 40 (width)."
    exit 1
fi

echo "SUCCESS: inputbox authentication logic is verified!"
exit 0
