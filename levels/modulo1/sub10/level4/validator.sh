#!/bin/bash

SCRIPT="/home/operator/confirm.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# We'll run the script twice with different mocked dialog exit codes.
# Set up a mock dialog in a temp directory
MOCK_DIR=$(mktemp -d)

# Test 1: YES choice (Exit status 0)
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
exit 0
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /tmp/dialog_calls.txt
rm -f /home/operator/action.log

# Run script
export PATH="$MOCK_DIR:$PATH"
"$SCRIPT" 2>/dev/null

if [ ! -f /home/operator/action.log ]; then
    echo "ERROR: /home/operator/action.log was not created on YES selection."
    rm -rf "$MOCK_DIR"
    exit 1
fi

ACTION_LOG_VAL=$(cat /home/operator/action.log)
if [ "$ACTION_LOG_VAL" != "logs cleared" ]; then
    echo "ERROR: Expected action.log to contain 'logs cleared', but got '$ACTION_LOG_VAL'."
    rm -rf "$MOCK_DIR"
    exit 1
fi

CALL_DETAILS=$(cat /tmp/dialog_calls.txt)
if ! echo "$CALL_DETAILS" | grep -F "Confirmation" >/dev/null; then
    echo "ERROR: Dialog title 'Confirmation' not found."
    rm -rf "$MOCK_DIR"
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -F "Do you want to clear the system logs?" >/dev/null; then
    echo "ERROR: Dialog text 'Do you want to clear the system logs?' not found."
    rm -rf "$MOCK_DIR"
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -E '8 40|8  40' >/dev/null; then
    echo "ERROR: Dialog dimensions must be 8 (height) and 40 (width)."
    rm -rf "$MOCK_DIR"
    exit 1
fi

# Test 2: NO choice (Exit status 1)
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
exit 1
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /home/operator/action.log
"$SCRIPT" 2>/dev/null

if [ ! -f /home/operator/action.log ]; then
    echo "ERROR: /home/operator/action.log was not created on NO selection."
    rm -rf "$MOCK_DIR"
    exit 1
fi

ACTION_LOG_VAL=$(cat /home/operator/action.log)
if [ "$ACTION_LOG_VAL" != "action cancelled" ]; then
    echo "ERROR: Expected action.log to contain 'action cancelled', but got '$ACTION_LOG_VAL'."
    rm -rf "$MOCK_DIR"
    exit 1
fi

rm -rf "$MOCK_DIR"
rm -f /tmp/dialog_calls.txt

echo "SUCCESS: yesno confirmation logic works perfectly!"
exit 0
