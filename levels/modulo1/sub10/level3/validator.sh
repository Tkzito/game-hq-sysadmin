#!/bin/bash

SCRIPT="/home/operator/welcome.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Set up a mock dialog in a temp directory
MOCK_DIR=$(mktemp -d)
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
EOF
chmod +x "$MOCK_DIR/dialog"

# Clear previous calls
rm -f /tmp/dialog_calls.txt

# Run user script with mock dialog in PATH
export PATH="$MOCK_DIR:$PATH"
"$SCRIPT" 2>/dev/null

rm -rf "$MOCK_DIR"

if [ ! -f /tmp/dialog_calls.txt ]; then
    echo "ERROR: The script did not execute the 'dialog' command."
    exit 1
fi

CALL_DETAILS=$(cat /tmp/dialog_calls.txt)
rm -f /tmp/dialog_calls.txt

# Validate call details
if ! echo "$CALL_DETAILS" | grep -F "Welcome" >/dev/null; then
    echo "ERROR: Dialog title 'Welcome' not found or message incorrect."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -E '\-\-msgbox|\-\-infobox' >/dev/null; then
    echo "ERROR: Dialog type must be --msgbox or --infobox."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -F "Welcome to Game HQ Ops Dashboard" >/dev/null; then
    echo "ERROR: Welcome text 'Welcome to Game HQ Ops Dashboard' not found."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -E '8 50|8  50' >/dev/null; then
    echo "ERROR: Dialog dimensions must be 8 (height) and 50 (width)."
    exit 1
fi

echo "SUCCESS: Welcome dialog verified!"
exit 0
