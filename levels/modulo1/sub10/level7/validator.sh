#!/bin/bash

SCRIPT="/home/operator/backup_select.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

MOCK_DIR=$(mktemp -d)

# Mock dialog to output "/etc" "/home"
cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
echo "CALL:" "$@" >> /tmp/dialog_calls.txt
if [[ "$*" == *"--stdout"* ]]; then
    echo '"/etc" "/home"'
else
    echo '"/etc" "/home"' >&2
fi
exit 0
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /tmp/dialog_calls.txt
rm -f /home/operator/backup_targets.txt

# Run script
export PATH="$MOCK_DIR:$PATH"
"$SCRIPT" 2>/dev/null

rm -rf "$MOCK_DIR"

if [ ! -f /home/operator/backup_targets.txt ]; then
    echo "ERROR: /home/operator/backup_targets.txt was not created."
    exit 1
fi

TARGETS_VAL=$(cat /home/operator/backup_targets.txt)
if ! echo "$TARGETS_VAL" | grep -F "/etc" >/dev/null || ! echo "$TARGETS_VAL" | grep -F "/home" >/dev/null; then
    echo "ERROR: Expected backup_targets.txt to contain '/etc' and '/home'."
    exit 1
fi

if echo "$TARGETS_VAL" | grep -F "/var/log" >/dev/null; then
    echo "ERROR: backup_targets.txt contains '/var/log' which was not in mock selection."
    exit 1
fi

CALL_DETAILS=$(cat /tmp/dialog_calls.txt)
rm -f /tmp/dialog_calls.txt

if ! echo "$CALL_DETAILS" | grep -F "Backup Targets" >/dev/null; then
    echo "ERROR: Dialog title 'Backup Targets' not found."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -E '15 50 5' >/dev/null; then
    echo "ERROR: Dialog dimensions 15 50 5 not found."
    exit 1
fi

if ! echo "$CALL_DETAILS" | grep -F "/etc" >/dev/null || ! echo "$CALL_DETAILS" | grep -F "/var/log" >/dev/null || ! echo "$CALL_DETAILS" | grep -F "/home" >/dev/null; then
    echo "ERROR: Missing configuration checklist options in dialog call."
    exit 1
fi

echo "SUCCESS: Checklist selector verified successfully!"
exit 0
