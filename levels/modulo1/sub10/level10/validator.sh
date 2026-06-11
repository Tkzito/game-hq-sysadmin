#!/bin/bash

SCRIPT="/home/operator/dashboard.sh"

if [ ! -f "$SCRIPT" ]; then
    echo "ERROR: File $SCRIPT does not exist."
    exit 1
fi

if [ ! -x "$SCRIPT" ]; then
    echo "ERROR: $SCRIPT is not executable."
    exit 1
fi

# Basic check for looping construct
if ! grep -qE "while|until|for|loop" "$SCRIPT"; then
    echo "ERROR: Dashboard script must use a loop to keep running until Option 4 is chosen."
    exit 1
fi

# Set up stateful mock dialog
MOCK_DIR=$(mktemp -d)
STATE_FILE="/tmp/mock_state"
echo "0" > "$STATE_FILE"
rm -f /tmp/dialog_calls.txt

cat << 'EOF' > "$MOCK_DIR/dialog"
#!/bin/bash
STATE_FILE="/tmp/mock_state"
VAL=$(cat "$STATE_FILE")
NEXT_VAL=$((VAL + 1))
echo "$NEXT_VAL" > "$STATE_FILE"

# Log the arguments
echo "CALL $NEXT_VAL:" "$@" >> /tmp/dialog_calls.txt

# Prevent infinite loops in tests
if [ $NEXT_VAL -gt 15 ]; then
    echo "ERROR: Loop ran too many times (infinite loop protection)." >&2
    exit 1
fi

# Determine if --stdout is set
to_stdout=0
if [[ "$*" == *"--stdout"* ]]; then
    to_stdout=1
fi

respond() {
    if [ $to_stdout -eq 1 ]; then
        echo "$1"
    else
        echo "$1" >&2
    fi
}

case $NEXT_VAL in
    1)
        # First menu show -> Select Option 1 (Stats)
        respond "1"
        ;;
    2)
        # Msgbox for Stats. Verify stats call parameters
        if [[ "$*" != *"--msgbox"* && "$*" != *"--infobox"* ]]; then
            echo "ERROR: Expected a msgbox or infobox call." >> /tmp/mock_errors.txt
        fi
        if [[ "$*" != *"Stats"* && "$*" != *"stats"* ]]; then
            echo "ERROR: Expected 'System Stats' title or text." >> /tmp/mock_errors.txt
        fi
        exit 0
        ;;
    3)
        # Second menu show -> Select Option 2 (Processes)
        respond "2"
        ;;
    4)
        # Msgbox for Processes
        if [[ "$*" != *"--msgbox"* && "$*" != *"--infobox"* ]]; then
            echo "ERROR: Expected a msgbox or infobox call." >> /tmp/mock_errors.txt
        fi
        if [[ "$*" != *"Processes"* && "$*" != *"processes"* ]]; then
            echo "ERROR: Expected 'Processes' title." >> /tmp/mock_errors.txt
        fi
        exit 0
        ;;
    5)
        # Third menu show -> Select Option 3 (Network)
        respond "3"
        ;;
    6)
        # Msgbox for Network
        if [[ "$*" != *"--msgbox"* && "$*" != *"--infobox"* ]]; then
            echo "ERROR: Expected a msgbox or infobox call." >> /tmp/mock_errors.txt
        fi
        if [[ "$*" != *"Interfaces"* && "$*" != *"interfaces"* && "$*" != *"Network"* ]]; then
            echo "ERROR: Expected 'Network Interfaces' title." >> /tmp/mock_errors.txt
        fi
        exit 0
        ;;
    7)
        # Fourth menu show -> Select Option 4 (Exit)
        respond "4"
        ;;
    *)
        # Failsafe exit
        respond "4"
        ;;
esac
exit 0
EOF
chmod +x "$MOCK_DIR/dialog"

rm -f /tmp/mock_errors.txt

# Run the user dashboard
export PATH="$MOCK_DIR:$PATH"
# Run with timeout to prevent hang if loop is infinite
timeout 5s "$SCRIPT" 2>/dev/null
RUN_STATUS=$?

rm -rf "$MOCK_DIR"
rm -f "$STATE_FILE"

if [ $RUN_STATUS -eq 124 ]; then
    echo "ERROR: Dashboard script hung or exceeded 5s timeout. Check loop termination."
    exit 1
fi

if [ -f /tmp/mock_errors.txt ]; then
    cat /tmp/mock_errors.txt
    rm -f /tmp/mock_errors.txt
    exit 1
fi

if [ ! -f /tmp/dialog_calls.txt ]; then
    echo "ERROR: The dashboard did not make any calls to 'dialog'."
    exit 1
fi

CALL_COUNT=$(wc -l < /tmp/dialog_calls.txt)
rm -f /tmp/dialog_calls.txt

# It should have called dialog at least 4 times (Menu1, Msgbox1, Menu2, Msgbox2, Menu3, Msgbox3, Menu4)
if [ "$CALL_COUNT" -lt 4 ]; then
    echo "ERROR: Dashboard didn't interact through options. Only $CALL_COUNT calls made."
    exit 1
fi

echo "SUCCESS: Dashboard menu loop verified!"
exit 0
