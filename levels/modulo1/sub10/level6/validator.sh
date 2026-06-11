#!/bin/bash

SCRIPT="/home/operator/menu.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

MOCK_DIR=$(mktemp -d)

# Test Option 1
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
if [[ "$*" == *"--stdout"* ]]; then
    echo "1"
else
    echo "1" >&2
fi
exit 0
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /tmp/dialog_calls.txt
rm -f /home/operator/maintenance.log

# Run script
export PATH="$MOCK_DIR:$PATH"
"$SCRIPT" 2>/dev/null

if [ ! -f /home/operator/maintenance.log ]; then
    echo "ERROR: Option 1 did not write to /home/operator/maintenance.log"
    rm -rf "$MOCK_DIR"
    exit 1
fi

if ! grep -qi "Filesystem\|Size\|Used\|Avail\|100%" /home/operator/maintenance.log; then
    echo "ERROR: Expected df -h output in maintenance.log for Option 1."
    rm -rf "$MOCK_DIR"
    exit 1
fi

# Validate first dialog call args
CALL_DETAILS=$(cat /tmp/dialog_calls.txt)
if ! echo "$CALL_DETAILS" | grep -F "Maintenance Menu" >/dev/null; then
    echo "ERROR: Dialog title 'Maintenance Menu' not found."
    rm -rf "$MOCK_DIR"
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -E '15 50 5' >/dev/null; then
    echo "ERROR: Dialog dimensions 15 50 5 not found."
    rm -rf "$MOCK_DIR"
    exit 1
fi

# Test Option 3
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
if [[ "$*" == *"--stdout"* ]]; then
    echo "3"
else
    echo "3" >&2
fi
exit 0
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /home/operator/maintenance.log
"$SCRIPT" 2>/dev/null

if [ ! -f /home/operator/maintenance.log ]; then
    echo "ERROR: Option 3 did not write to /home/operator/maintenance.log"
    rm -rf "$MOCK_DIR"
    exit 1
fi

LOG_VAL=$(cat /home/operator/maintenance.log)
if [ "$LOG_VAL" != "Services restarted" ]; then
    echo "ERROR: Expected 'Services restarted' in maintenance.log, got '$LOG_VAL'."
    rm -rf "$MOCK_DIR"
    exit 1
fi

rm -rf "$MOCK_DIR"
rm -f /tmp/dialog_calls.txt

echo "SUCCESS: Maintenance menu logic verified!"
exit 0
